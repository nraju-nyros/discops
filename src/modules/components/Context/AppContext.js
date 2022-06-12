import React, { useState, createContext, useEffect } from "react";
import { message, Spin } from "antd";
//import { Auth } from 'aws-amplify';
import { CloudSyncOutlined, LoadingOutlined } from "@ant-design/icons";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { Base64URLEncode } from "./helpers";
import { HttpHelper,
    SessionTimeoutError,
    ServiceUnavailableError,
    AuthenticationError,
    UserLockedError,} from "./httpHelper";
import { CustomModal } from "./CustomModal";
// import { randomBytes } from "crypto";
import { SetFeaturesUrl } from "./app-feature";
var screen;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const IssuerTypes = {
    AWS: "AWS",
    AZURE: "AZURE",
    AUTH0: "AUTH0",
  };

  const destinations = [
    { type: 1, name: "E-mail" },
    { type: 2, name: "SMS" },
    { type: 3, name: "App-Notification" },
  ];

  const baseURL = process.env.REACT_APP_API_ENDPOINT;
  const appID = process.env.REACT_APP_ID;
  const appVersion = process.env.REACT_APP_VERSION;

  const [history, setHistory] = useState(null);
  const [isLogout, setIsLogout] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const [authInfo, setAuthInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [oAuthPopupInstance, setOAuthPopupInstance] = useState(null);
  const [oAuthCodeVerifier, setOAuthCodeVerifier] = useState(null);

  const [alertModalButtonLoading, setAlertModalButtonLoading] = useState(false);
  const [modalData, setModalData] = useState({
    icon: "",
    showModal: false,
    titleText: "",
    messageText: "",
    showCancelButton: false,
    confirmButtonText: "Okay",
    type: null,
  });

  const [moduleState, setModuleState] = useState({
    moduleName: "",
    searchValue: "",
    sortValue: "",
    orderByValue: "",
    offset: 1,
    pageSize: 10,
    filterData: {
      isFilter: false,
    },
  });

  // to check oauth popup for code param
  useEffect(() => {
    if (!oAuthPopupInstance) return;
    const timer = setInterval(async () => {
      if (!oAuthPopupInstance) {
        timer && clearInterval(timer);
        return;
      }
      let currentUrl = oAuthPopupInstance.location.href;
      if (!currentUrl) {
        return;
      }
      // if origins are not same then ignore
      if (
        new URL(currentUrl).origin !== new URL(authInfo.redirect_url).origin
      ) {
        return;
      }

      const searchParams = new URL(currentUrl).searchParams;
      const code = searchParams.get("code");
      if (code) {
        oAuthPopupInstance.close();
        const oData = {
          grant_type: authInfo.grant_type,
          scope: authInfo.scope,
          client_id: authInfo.client_id,
          redirect_uri: authInfo.redirect_url,
          code: code,
          code_verifier: oAuthCodeVerifier,
        };
        let accessToken = await HttpHelper.AuthForm(
          `${authInfo.TokenUrl}/token`,
          oData,
          "access_token"
        );

        // clear timer at the end
        setOAuthPopupInstance(null);
        timer && clearInterval(timer);

        let result = await AppLogin(accessToken);
        if (result) {
          history?.push("/home");
        }
      }
    }, 500);
  }, [oAuthPopupInstance]);

  const resetModuleState = () => {
    setModuleState({
      moduleName: "",
      searchValue: "",
      sortValue: "",
      orderByValue: "",
      offset: 1,
      pageSize: 10,
      filterData: {
        isFilter: false,
      },
    });
  };

  const SetHttpContext = async (aSessionID, aAccessToken) => {
    // To Do - can we find a better Device ID
    let hardwareID = localStorage.getItem("deviceID");
    if (!hardwareID) {
      // Get the visitor identifier when you need it.
      const fp = await FingerprintJS.load({ monitoring: false });
      const result = await fp.get();
      hardwareID = result.visitorId;

      localStorage.setItem("deviceID", hardwareID);
    }

    let oContext = {
      BaseURL: baseURL,
      AppID: appID,
      AppVersion: appVersion,
      DeviceID: hardwareID,
      SessionID: aSessionID,
      AccessToken: aAccessToken,
    };
    HttpHelper.SetContext(oContext);
  };

  const HttpGet = async (
    aFunction,
    aParams,
    aShowLoader = true,
    aIsCritical = true
  ) => {
    try {
      if (aShowLoader) setShowSpinner(true);
      return await HttpHelper.HttpGet(aFunction, aParams);
    } catch (e) {
      ErrorHandler(e, aIsCritical);
    } finally {
      if (aShowLoader) setShowSpinner(false);
    }
    return false;
  };

  const HttpGetList = async (
    aFunction,
    aParams,
    aShowLoader = true,
    aBackgroundCall = false
  ) => {
    try {
      if (aShowLoader && aBackgroundCall !== true) setShowSpinner(true);
      return await HttpHelper.HttpGetList(aFunction, aParams);
    } catch (e) {
      ErrorHandler(e, false);
    } finally {
      if (aShowLoader) setShowSpinner(false);
    }
    return false;
  };

  const HttpPost = async (aFunction, aPayload, aShowLoader = true) => {
    try {
      if (aShowLoader) setShowSpinner(true);
      return await HttpHelper.HttpPost(aFunction, aPayload);
    } catch (e) {
      ErrorHandler(e, true);
    } finally {
      if (aShowLoader) setShowSpinner(false);
    }
    return false;
  };

  const HttpFile = async (aFunction, aPayload, aShowLoader = true) => {
    try {
      if (aShowLoader) setShowSpinner(true);
      return await HttpHelper.HttpFile(aFunction, aPayload);
    } catch (e) {
      ErrorHandler(e, true);
    } finally {
      if (aShowLoader) setShowSpinner(false);
    }
    return false;
  };

  const HttpPut = async (aFunction, aPayload, aShowLoader = true) => {
    try {
      if (aShowLoader) setShowSpinner(true);
      return await HttpHelper.HttpPut(aFunction, aPayload);
    } catch (e) {
      ErrorHandler(e, true);
    } finally {
      if (aShowLoader) setShowSpinner(false);
    }
    return false;
  };

  const HttpDelete = async (aFunction, aParams, aShowLoader = true) => {
    try {
      if (aShowLoader) setShowSpinner(true);
      return await HttpHelper.HttpDelete(aFunction, aParams);
    } catch (e) {
      ErrorHandler(e, true);
    } finally {
      if (aShowLoader) setShowSpinner(false);
    }
    return false;
  };

  const ErrorHandler = (errorInfo, isCritical) => {
    // based on the type of error we will set the modal data and show the modal
    setShowSpinner(false);
    setIsTimeout(false);
    if (errorInfo instanceof ServiceUnavailableError) {
      setModalData({
        icon: "",
        showModal: true,
        titleText: "Service Unavailable",
        messageText: errorInfo.message,
        showCancelButton: false,
        confirmButtonText: "Okay",
        type: "ServiceUnavailable",
      });
    } else if (errorInfo instanceof SessionTimeoutError) {
      setIsTimeout(true);
      setModalData({
        icon: "",
        showModal: true,
        titleText: "Session Expired",
        messageText: errorInfo.message,
        showCancelButton: false,
        confirmButtonText: "Okay",
        type: "SessionTimeout",
      });
    } else if (errorInfo instanceof AuthenticationError) {
      //setIsTimeout(true);
      setModalData({
        icon: "",
        showModal: true,
        titleText: "Authentication Error",
        messageText: errorInfo.message,
        showCancelButton: false,
        confirmButtonText: "Okay",
        type: "Authentication",
      });
    } else if (errorInfo instanceof UserLockedError) {
      //setIsTimeout(true);
      setModalData({
        icon: "",
        showModal: true,
        titleText: "User Locked",
        messageText: errorInfo.message,
        showCancelButton: false,
        confirmButtonText: "Okay",
        type: "UserLocked",
      });
    } else if (isCritical) {
      setModalData({
        icon: "",
        showModal: true,
        titleText: "Error",
        messageText: errorInfo.message,
        showCancelButton: false,
        confirmButtonText: "Okay",
        type: "error",
      });
    } else {
      showToastAlert({ type: "error", message: errorInfo.message });
    }
  };

  const onErrorModalButtonClick = () => {
    if (isTimeout) {
      AppLogout(false);
      history?.push("/");
    }
    setModalData({ ...modalData, showModal: false });
  };

  const AppInfo = async (aHistory) => {
    await SetHttpContext();

    setHistory(aHistory);

    let apiResponse = await HttpGet("/auth/AuthInfo");
    if (apiResponse) {
      setPageInfo({
        TenantID: apiResponse.TenantId,
        LoginImage: apiResponse.LoginImage,
        HomeTitle: apiResponse.HomeTitle,
        WelcomeText: apiResponse.WelcomeText,
        SecurityTitle: apiResponse.SecurityTitle,
        SecurityText: apiResponse.SecurityText,
      });

      //set localstorage regardless, no need to check
      localStorage.setItem(
        "bckgrndImg",
        `data:image/png;base64,${apiResponse?.LoginImage}`
      );

      if (
        apiResponse.AuthParams &&
        Object.keys(apiResponse.AuthParams).length &&
        !apiResponse.HasCertificate
      ) {
        // uncomment below code to test azure login on localhost
        // apiResponse.AuthParams.redirect_url = "http://localhost:3000/"
        setAuthInfo(apiResponse.AuthParams);
      }
    }
  };

  const AppLogin = async (aAccessToken) => {
    await SetHttpContext(null, aAccessToken);

    let apiResponse = await HttpPost("/auth/login", null);
    if (apiResponse) {
      const accessObj = apiResponse.features;
      let accesses = [];
      if (accessObj) {
        accessObj.forEach((accessSet) =>
          accessSet.apis.forEach((api) => accesses.push(api))
        );
      }

      setUserInfo({
        UserID: apiResponse.userID,
        FullName: apiResponse.fullName,
        Image: apiResponse.image,
        LastLogin: apiResponse.lastLogin,
        SessionID: apiResponse.sessionID,
        UserFeatures: apiResponse.features,
        TimeoutMins: apiResponse.inactivityTimeout,
        UserAccess: accesses,
      });
      await SetHttpContext(apiResponse.sessionID, aAccessToken);
      SetFeaturesUrl(apiResponse.features);
    }

    return apiResponse;
  };

  const AppLogout = async (callLogoutApi = true) => {
    try {
      if (callLogoutApi) {
        return await HttpPost("/auth/logout", null);
      }
    } catch (e) {
      showToastAlert({ type: "error", message: e.message });
    } finally {
      if (callLogoutApi) {
        setIsLogout(true);
      }
      setPageInfo(null);
      setAuthInfo(null);
      setUserInfo(null);
      HttpHelper.SetContext(null);
    }
  };

  const AuthLogin = async (username, password) => {
    let accessToken;

    try {
      setShowSpinner(true);
      let authType = authInfo?.OpenIdType?.toUpperCase();
      if (authType === IssuerTypes.AUTH0) {
        const oData = {
          grant_type: authInfo.grant_type, //'password',
          username: username,
          password: password,
          scope: authInfo.scope, //'openid offline_access',
          client_id: authInfo.client_id,
          audience: authInfo.audience,
        };
        accessToken = await HttpHelper.AuthForm(authInfo.TokenUrl, oData);
      } else if (authType === IssuerTypes.AZURE) {
        let codeVerifier = Base64URLEncode();
        setOAuthCodeVerifier(codeVerifier);

        var dualScreenLeft =
          window.screenLeft !== undefined ? window.screenLeft : screen.left;
        var dualScreenTop =
          window.screenTop !== undefined ? window.screenTop : screen.top;

        var screenWidth = window.innerWidth
          ? window.innerWidth
          : document.documentElement.clientWidth
          ? document.documentElement.clientWidth
          : screen.width;
        var screenHeight = window.innerHeight
          ? window.innerHeight
          : document.documentElement.clientHeight
          ? document.documentElement.clientHeight
          : screen.height;

        var popupLeft = screenWidth / 2 - 500 / 2 + dualScreenLeft;
        var popupTop = screenHeight / 2 - 500 / 2 + dualScreenTop;

        let _oAuthPopup = window.open(
          `${authInfo.TokenUrl}/authorize?client_id=${authInfo.client_id}&response_type=code&redirect_uri=${authInfo.redirect_url}&response_mode=query&scope=${authInfo.scope}&code_challenge=${codeVerifier}`,
          "OAuth Authorization",
          `width=500,height=500,left=${popupLeft},top=${popupTop}`
        );
        setOAuthPopupInstance(_oAuthPopup);
      }
      /*else if (authType === IssuerTypes.AWS) {
                try {

                    Auth.configure({
                        authenticationFlowType: authInfo.grant_type, //'USER_SRP_AUTH',
                        userPoolId: authInfo.audience, //'us-east-1_LwLQqfext'
                        userPoolWebClientId: authInfo.client_id //'7ef9h1ahm2ra77sg4ocnj3jta9'
                    });

                    const res = await Auth.signIn(username, password);
                    accessToken = res?.signInUserSession?.idToken?.jwtToken || null;
                }
                catch (e) {
                    throw e;
                }
            }*/
    } catch (e) {
      ErrorHandler(e, false);
      accessToken = null;
    } finally {
      setShowSpinner(false);
    }

    if (!accessToken) return null;

    return await AppLogin(accessToken);
  };

  const showToastAlert = (messageInfo) => {
    if (messageInfo.type === "error") {
      message.error(
        {
          content: messageInfo.message,
          className: "error-toast-msg",
        },
        5
      );
    } else {
      message.success(
        {
          content: messageInfo.message,
          className: "success-toast-msg",
        },
        5
      );
    }
  };

  const getTitle = (id, features) => {
    let result;

    features.forEach((item) => {
      if (item.id === id) {
        result = { title: item.name, subTitle: item.description };
      } else if (item.submenu?.length && !result) {
        const result1 = getTitle(id, item.submenu);
        if (result1) result = result1;
      }
    });
    return result;
  };

  const checkModulePermission = (moduleList, module, access) => {
    let hasAccess = false;
    moduleList.forEach((feature) => {
      if (
        feature.id === module &&
        feature.apis &&
        feature.apis.includes(access)
      ) {
        hasAccess = true;
      }
      if (!hasAccess && feature.submenu && feature.submenu.length) {
        hasAccess = checkModulePermission(feature.submenu, module, access);
      }
    });
    return hasAccess;
  };

  const acl = (module, access) => {
    let hasAccess = false;
    if (userInfo.UserFeatures.length) {
      hasAccess = checkModulePermission(userInfo.UserFeatures, module, access);
    }
    return hasAccess;
  };

  const contextValue = {
    IssuerTypes,
    moduleState,
    setModuleState,
    resetModuleState,
    acl,
    getTitle,
    appID,
    appVersion,
    authInfo,
    pageInfo,
    userInfo,
    isLogout,
    destinations,
    AppInfo,
    AppLogin,
    AppLogout,
    AuthLogin,
    showToastAlert,
    ErrorHandler,
    HttpDelete,
    HttpGet,
    HttpGetList,
    HttpPut,
    HttpPost,
    HttpFile,
    setAlertModalButtonLoading,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Spin
        wrapperClassName="h-full"
        spinning={showSpinner}
        indicator={
          <LoadingOutlined style={{ fontSize: 26, color: "#4E2C90" }} spin />
        }
      >
        {children}
      </Spin>
      <CustomModal
        icon={modalData.icon}
        showModal={modalData.showModal}
        isLoading={alertModalButtonLoading}
        titleText={modalData.titleText}
        messageText={modalData.messageText}
        showCancelButton={modalData.showCancelButton}
        handleCancel={() => setModalData({ ...modalData, showModal: false })}
        confirmButtonText={modalData.confirmButtonText}
        handleConfirm={() => onErrorModalButtonClick()}
        zIndex={1001}
      />
    </AppContext.Provider>
  );
};