import React, { useContext, useState } from "react";
import { Drawer, Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import { AppContext } from "../store/app-context";
import { FormatDateLocal } from "../common/helpers";
import { CustomModal } from "../common/CustomModal";
import "./sidebar-style.css";
import { useNavigate } from "react-router-dom";


export const SideBar = (props) => {

  const userInfo=[
    {
        "id": "Api-Notification",
        "name": "Notification",
        "icon": "notifications-icon",
        "description": "Manage Notifications here",
        "orderNo": 1,
        "submenu": [],
        "apis": [
            "DeleteNotification",
            "GetEquipments",
            "GetNotification",
            "GetNotificationList",
            "PostNotification",
            "PutNotification",
            "PutNotificationClearAndClose",
            "PutNotificationFaultClearing"
        ],
        "url": "notifications"
    },
    // {
    //     "id": "Api-WorkOrder",
    //     "name": "Work Order",
    //     "icon": "workOrders-icon",
    //     "description": "Manage Work Orders here",
    //     "orderNo": 2,
    //     "submenu": [],
    //     "apis": [
    //         "DeleteOperation",
    //         "DeleteWorkOrderMaterial",
    //         "GetAdviceCodes",
    //         "GetMaterialById",
    //         "GetMaterials",
    //         "GetOperation",
    //         "GetOperationByWorkOrderID",
    //         "GetOperationList",
    //         "GetReservationByWorkOrderMaterialID",
    //         "GetWorkOrder",
    //         "GetWorkOrderList",
    //         "GetWorkOrderMaterial",
    //         "GetWorkOrderMaterialByWorkOrderID",
    //         "GetWorkOrderMaterialList",
    //         "PostOperation",
    //         "PostWorkOrder",
    //         "PostWorkOrderMaterial",
    //         "PutIssueMaterial",
    //         "PutOperation",
    //         "PutTechnicallyComplete",
    //         "PutWorkOrder",
    //         "PutWorkOrderAddNotification",
    //         "PutWorkOrderMaterial"
    //     ],
    //     "url": "workOrder"
    // },
    {
        "id": "Api-Purchasing",
        "name": "Purchasing",
        "icon": "purchasings-icon",
        "description": "Manage Purchasing here",
        "orderNo": 3,
        "submenu": [],
        "apis": [
            "GetPurchasing",
            "GetPurchasingList",
            "PostPurchasing",
            "PutPurchasing"
        ],
        "url": "purchasing"
    },
    {
        "id": "Api-WorkInProcess",
        "name": "Work In Process",
        "icon": "iot-icon",
        "description": "Manage Work In Process here",
        "orderNo": 4,
        "submenu": [],
        "apis": [
            "GetNotificationList",
            "GetWorkOrderList"
        ],
        "url": "workinprocess"
    },
    {
        "id": "Api-Dispatch",
        "name": "Dispatch",
        "icon": "checkouttools-icon",
        "description": "Manage Dispatches here",
        "orderNo": 5,
        "submenu": [],
        "apis": [
            "DeleteOperation",
            "GetDispatch",
            "GetDispatchList",
            "GetEquipments",
            "GetIsQualified",
            "GetOperators",
            "PostDispatch",
            "PutDispatch"
        ],
        "url": "dispatch"
    },
    // {
    //     "id": "Api-FunctionalLocation",
    //     "name": "Functional Location",
    //     "icon": "locations-icon",
    //     "description": "Manage Functional Locations here",
    //     "orderNo": 6,
    //     "submenu": [],
    //     "apis": [
    //         "GetFunctionalLocationList"
    //     ],
    //     "url": "functionallocationreport"
    // }
]
  const ctx = []
  // const history = useHistory();
    let history = useNavigate();




  const [visible, setVisible] = useState(false);
  const [menuNameFor, setMenuNameFor] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showDropdownMenuFor, setShowDropdownMenuFor] = useState([]);
  const [menuUpdateCount, setMenuUpdateCount] = useState(0);
  const [miniMenuIconHoverEffect, setMiniMenuIconHoverEffect] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  //Consent
  const [modalButtonLoading, setModalButtonLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [userFeatures,setUserFeatures] = useState(userInfo);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onLogOut = async () => {
    setModalButtonLoading(true);
    const response = await ctx.AppLogout();
    if (response) {
      ctx.showToastAlert({
        type: "success",
        message: response,
      });
      history.push("/");
    } else {
      setShowLogoutModal(false);
    }
    setModalButtonLoading(false);
  };

  const getOffset = (el) => {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
    };
  };

  const setTooltipTimer = (menuName) => {
    window["menuTooltipTimer"] = setTimeout(() => {
      setMenuNameFor(menuName);
    }, process.env.REACT_APP_MENU_HOVER_INTERVAL_TIMER);
  };

  const clearTooltipTimer = (setActiveMenuNull = false) => {
    clearTimeout(window["menuTooltipTimer"]);
    setMenuNameFor(null);
    if (setActiveMenuNull) {
      setActiveMenu(null);
    }
  };

  const renderMenuItem = (
    menuName,
    icon,
    url,
    show,
    onClick,
    onMouseLeave,
    desc,
    submenu = [],
    afterBorder = 0
  ) => {
    let { page } = props;
    if (!page) {
      page = "";
    }
    let hasActiveChild = false;
    let menuId = `mini-menu-item-${menuName.replace(/\s/g, "-").toLowerCase()}`;
    let menuTooltip = (
      <>
        <div
          className="menu-hover-detail submenu-mini-menu-text menu-label absolute text-left rounded-lg text-white text-h1 leading-normal font-medium px-4 py-5"
          style={{
            opacity: show && show === menuId ? 1 : 0,
            width: show && show === menuId ? "13rem" : "0",
            height: show && show === menuId ? "40px" : "0",
            padding: show && show === menuId ? "10px 0" : "0",
            left: show && show === menuId ? "53px" : 0,
            backgroundColor: "rgb(121, 107, 169)",
            color: "rgba(255, 255, 255, 0.8)",
            visibility: show && show === menuId ? "visible" : "hidden",
          }}
        >
          {/* tooltip start */}
          <div
            className="relative text-center"
            style={{
              backgroundColor: "rgb(121, 107, 169)",
              color: "rgba(255, 255, 255, 0.9)",
            }}
          >
            <div className="mb-3 flex justify-center">
              <div
                className="p-2 rounded-md"
                style={{ backgroundColor: "rgb(141, 129, 182)" }}
              >
                <div
                  className="bg-no-repeat bg-center bg-contain"
                  style={{
                    backgroundImage: `url(/images/icons/api-${icon}-menu.svg)`,
                    width: "16px",
                    height: "16px",
                  }}
                ></div>
              </div>
            </div>
            <Link
              className={`menu-link ${
                submenu.length ? "" : "pointer-events-none"
              }`}
              to={url}
            >
              <span
                className="font-semibold cursor-pointer"
                style={{ fontSize: "13px" }}
              >
                {menuName}
              </span>
            </Link>
            <p
              className="font-medium"
              style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.75)" }}
            >
              {desc}
            </p>
          </div>
          {/* tooltip end */}
        </div>
        <span
          role="img"
          aria-label="caret-left"
          className="anticon anticon-caret-left relative mx-auto bottom-0"
          style={{
            opacity: show && show === menuId ? 1 : 0,
            top: "-31px",
            left: "22px",
            color: "#9486c5",
            visibility: show && show === menuId ? "visible" : "hidden",
          }}
        >
          <svg
            viewBox="0 0 1024 1024"
            focusable="false"
            data-icon="caret-left"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M689 165.1L308.2 493.5c-10.9 9.4-10.9 27.5 0 37L689 858.9c14.2 12.2 35 1.2 35-18.5V183.6c0-19.7-20.8-30.7-35-18.5z"></path>
          </svg>
        </span>
      </>
    );

    return (
      <div
        key={menuName}
        id={menuId}
        className={`mb-1 
        ${submenu.length > 0 && !show ? "" : ""}  
        ${
          show && show === url
            ? `${afterBorder === 0 ? "mb-12" : "mb-16"} border-transparent`
            : "border-athens-gray"
        }`}
        onMouseEnter={() => {
          // get parent element id
          let miniItemElm = document.getElementById(menuId);
          // select all elements with class ".menu-hover-detail"
          let menuHoverElements = document.querySelectorAll(
            `#${menuId} .menu-hover-detail`
          );
          // set top position for each  elements
          menuHoverElements.forEach((item) => {
            item.style.cssText = `${item.style.cssText};top:${
              getOffset(miniItemElm).top
            }px`;
          });
        }}
      >
        <div
          className={`mb-1 mini-menu-text ${
            miniMenuIconHoverEffect !== false ||
            (activeMenu && activeMenu === menuId)
              ? "mini-menu-icon-hover"
              : ""
          }`}
          style={{
            backgroundColor: `${
              page === url || hasActiveChild
                ? "rgba(255, 255, 255, 0.15)"
                : "transparent"
            }`,
            height: "40px",
            width: "53px",
          }}
          onMouseEnter={() => setTooltipTimer(menuId)}
          onMouseLeave={() => clearTooltipTimer(submenu.length ? true : false)}
        >
          {submenu.length ? (
            <div style={{ height: "40px", width: "53px" }}>
              <Button
                onClick={() => {
                  setActiveMenu(menuId);
                  clearTooltipTimer(false);
                }}
                style={{
                  backgroundColor: "transparent",
                  cursor: "inherit",
                }}
                className="border-0 h-full"
              >
                <div
                  style={{ backgroundImage: `url(${icon})` }}
                  className="bg-no-repeat bg-center bg-contain"
                >
                  <img
                    src={`/images/icons/api-${icon}-menu.svg`}
                    alt={menuName}
                    style={{ height: "17px" }}
                  />
                </div>
              </Button>
              {menuTooltip}
              <div
                className="menu-hover-detail submenu-mini-menu-text menu-label absolute text-left rounded-r-lg text-white text-h1 leading-normal font-medium"
                style={{
                  opacity: activeMenu && activeMenu === menuId ? 1 : 0,
                  width: activeMenu && activeMenu === menuId ? "150px" : "0",
                  height: activeMenu && activeMenu === menuId ? "40px" : "0",
                  padding:
                    activeMenu && activeMenu === menuId ? "10px 5px" : "0",
                  left: activeMenu && activeMenu === menuId ? "53px" : 0,
                  backgroundColor: "rgb(121, 107, 169)",
                }}
              >
                <div
                  className="pb-2 px-3 text-h1 leading-normal font-medium"
                  style={{ color: "rgba(255, 255, 255, 0.5)" }}
                >
                  {menuName}
                </div>
                {submenu.map((s, i) => {
                  if (!hasActiveChild) {
                    hasActiveChild = page === s.url;
                  }
                  return (
                    <div
                      key={i}
                      className={`${
                        page === s.url ? "bg-white-2" : ""
                        // need to verify with saurabh start
                      } datasheet-sidebar-close font-poppins text-xs font-medium text-white text-left py-1 pl-3 __pr-6 rounded-lg minimenu-submenu-bg`}
                    >
                      <div className="flex items-center">
                        <div className="w-1 h-1 mr-2.5 bg-white rounded-full"></div>
                        {/* need to verify with saurabh  end*/}
                        <Link to={`/${s.url}`}>
                          <span
                            style={{ color: "rgba(255, 255, 255)" }}
                            className="font-poppins text-xs leading-normal font-medium ml-2"
                          >
                            {s.name}
                          </span>
                        </Link>
                        {/* need to verify with saurabh start*/}
                        {showDropdownMenuFor.includes(s.submenu) ? (
                          <button
                            size="small"
                            onClick={() => handleMenuDropdownClick(s.name)}
                            style={{ backgroundColor: "transparent" }}
                            className="border-0 px-2"
                          >
                            <img
                              alt="setting"
                              src="/images/icons/sidebar-up-arrow1.svg"
                              className="my-auto bg-no-repeat bg-center bg-cover "
                              style={{
                                transform: showDropdownMenuFor.includes(s.name)
                                  ? "rotate(0deg)"
                                  : "rotate(180deg)",
                              }}
                            />
                          </button>
                        ) : (
                          ""
                        )}
                      </div>

                      {/* submenu inside submenu start */}

                      <div
                        className={`${
                          showDropdownMenuFor.includes(s.submenu)
                            ? ""
                            : "hidden"
                        } pr-3 py-2`}
                      >
                        {submenu.map((s, i) => {
                          if (!hasActiveChild) {
                            hasActiveChild = page === s.url;
                          }
                          return (
                            <div
                              key={i}
                              className="datasheet-sidebar-close font-poppins text-xs font-medium text-left __pr-6 flex items-center pl-4 py-1"
                              style={{
                                borderLeft: isDisabled
                                  ? "1px solid rgba(255, 255, 255, 0.3)"
                                  : "1px solid #fff",
                                color: isDisabled
                                  ? "rgba(255, 255, 255, 0.3)"
                                  : "#fff",
                              }}
                            >
                              <Link
                                to={`/${s.url}`}
                                style={{
                                  cursor: isDisabled ? "not-allowed" : "",
                                }}
                              >
                                <span
                                  className="font-poppins text-h1 leading-normal font-medium"
                                  style={{
                                    color: isDisabled
                                      ? "rgba(255, 255, 255, 0.3)"
                                      : "#fff",
                                  }}
                                >
                                  {s.name}
                                </span>
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                      {/* submenu inside submenu end */}
                      {/* need to verify with saurabh  end*/}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <Link to={`/${url}`}>
              <div style={{ height: "40px", width: "53px" }}>
                <Button
                  onClick={onClick}
                  style={{ backgroundColor: "transparent" }}
                  className="border-0 h-full"
                >
                  <div
                    style={{ backgroundImage: `url(${icon})` }}
                    className="bg-no-repeat bg-center bg-contain"
                  >
                    <img
                      src={`/images/icons/api-${icon}-menu.svg`}
                      alt={menuName}
                      style={{ height: "17px" }}
                    />
                  </div>
                </Button>
                {menuTooltip}
              </div>
            </Link>
          )}
        </div>

        {afterBorder ? (
          <div
            className="my-5"
            style={{ border: "1px solid #FFFFFF34", height: 0 }}
          />
        ) : (
          ""
        )}
      </div>
    );
  };

  const renderDrawerMenuItem = (
    menuName,
    icon,
    url,
    submenu = [],
    afterBorder = 0
  ) => {
    const { page } = props;
    let hasActiveChild = false;
    return (
      <div
        key={menuName}
        className={`pl-5 pr-2 ${
          submenu.length > 0 ? "" : "sidebar-open-link-bg"
        }`}
        style={{
          backgroundColor: `${
            page === url ? "rgba(255, 255, 255, 0.15)" : "transparent"
          }`,
        }}
      >
        {submenu.length ? (
          <>
            <div
              className={`flex font-poppins text-white text-h1 font-medium leading-normal 
              `}
              style={{ height: "40px" }}
            >
              <div className="flex">
                <img
                  src={`/images/icons/api-${icon}-menu.svg`}
                  alt={menuName}
                  className={`my-auto w-4 h-4 bg-no-repeat bg-center bg-cover ${
                    showDropdownMenuFor.includes(menuName) ? "opacity-50" : ""
                  }`}
                />
              </div>
              <div
                className={`my-auto px-3 ${
                  showDropdownMenuFor.includes(menuName) ? "opacity-50" : ""
                }`}
              >
                {menuName}
              </div>
              <button
                size="small"
                onClick={() => {
                  handleMenuDropdownClick(menuName);
                }}
                style={{ backgroundColor: "transparent" }}
                className="border-0 p-2 flex justify-end ml-auto"
              >
                <img
                  alt="setting"
                  src="/images/icons/sidebar-up-arrow1.svg"
                  className="my-auto w-3 h-3 bg-no-repeat bg-center bg-cover "
                  style={{
                    transform: showDropdownMenuFor.includes(menuName)
                      ? "rotate(0deg)"
                      : "rotate(180deg)",
                  }}
                />
              </button>
            </div>
            <div
              className={`${
                showDropdownMenuFor.includes(menuName) ? "" : "hidden"
              }`}
              style={{ marginTop: "-8px" }}
            >
              {submenu.map((s, i) => {
                if (!hasActiveChild) {
                  hasActiveChild = page === s.url;
                }
                return (
                  <div
                    key={i}
                    //  need to verify with saurabh start
                    className={`${
                      page === s.url || showDropdownMenuFor.includes(s.submenu)
                        ? "bg-white-2"
                        : ""
                    } datasheet-sidebar-close font-poppins text-xs font-medium text-white text-left py-1 __pr-6 rounded-lg pl-4 sidebar-open-submenu-link-bg`}
                  >
                    <div className="flex items-center">
                      {/* need to verify with saurabh  end*/}
                      <div className="w-1 h-1 mr-2.5 bg-white rounded-full"></div>
                      <Link to={`/${s.url}`}>
                        <span className="font-poppins text-xs leading-normal font-medium text-white">
                          {s.name}
                        </span>
                      </Link>
                      {/* need to verify with saurabh start*/}
                      {showDropdownMenuFor.includes(s.submenu) ? (
                        <button
                          size="small"
                          onClick={() => handleMenuDropdownClick(s.name)}
                          style={{ backgroundColor: "transparent" }}
                          className="border-0 px-2"
                        >
                          <img
                            alt="setting"
                            src="/images/icons/sidebar-up-arrow1.svg"
                            className="my-auto bg-no-repeat bg-center bg-cover "
                            style={{
                              transform: showDropdownMenuFor.includes(s.name)
                                ? "rotate(0deg)"
                                : "rotate(180deg)",
                            }}
                          />
                        </button>
                      ) : (
                        ""
                      )}
                    </div>

                    {/* submenu inside submenu start */}

                    <div
                      className={`${
                        showDropdownMenuFor.includes(s.submenu) ? "" : "hidden"
                      } pr-3 py-2`}
                    >
                      {submenu.map((s, i) => {
                        if (!hasActiveChild) {
                          hasActiveChild = page === s.url;
                        }
                        return (
                          <div
                            key={i}
                            className="datasheet-sidebar-close font-poppins text-xs font-medium text-left __pr-6 flex items-center pl-4 py-1"
                            style={{
                              borderLeft: isDisabled
                                ? "1px solid rgba(255, 255, 255, 0.3)"
                                : "1px solid #fff",
                              color: isDisabled
                                ? "rgba(255, 255, 255, 0.3)"
                                : "#fff",
                            }}
                          >
                            <Link
                              to={`/${s.url}`}
                              style={{
                                cursor: isDisabled ? "not-allowed" : "",
                              }}
                            >
                              <span
                                className="font-poppins text-h1 leading-normal font-medium"
                                style={{
                                  color: isDisabled
                                    ? "rgba(255, 255, 255, 0.3)"
                                    : "#fff",
                                }}
                              >
                                {s.name}
                              </span>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                    {/* submenu inside submenu end */}
                    {/* need to verify with saurabh  end*/}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <Link
            to={`/${url}`}
            type="text"
            size="large"
            className="sidebar-open-link-bg w-full border-0"
          >
            <div
              className="flex font-poppins text-white text-h1 font-medium leading-normal"
              style={{ height: "40px" }}
            >
              <div className="flex">
                <img
                  src={`/images/icons/api-${icon}-menu.svg`}
                  alt={menuName}
                  className="my-auto w-4 h-4 bg-no-repeat bg-center bg-cover"
                />
              </div>
              <div className="my-auto px-3">{menuName}</div>
            </div>
          </Link>
        )}
        {afterBorder ? (
          <div
            className="my-5"
            style={{ border: "1px solid #FFFFFF34", height: 0 }}
          />
        ) : (
          ""
        )}
      </div>
    );
  };

  const handleMenuDropdownClick = (menuName) => {
    var openMenuItems = showDropdownMenuFor;
    if (openMenuItems.includes(menuName)) {
      openMenuItems.splice(openMenuItems.indexOf(menuName), 1);
      setShowDropdownMenuFor(openMenuItems);
    } else {
      openMenuItems.push(menuName);
      setShowDropdownMenuFor(openMenuItems);
    }
    // console.log(openMenuItems);
    setMenuUpdateCount(menuUpdateCount + 1);
  };

  let profileMenuId = "mini-menu-item-profile";

  return (
    <div
      className="h-full z-10 fixed"
      style={{
        backgroundImage: "linear-gradient(to bottom, #674f98, #4266a9)",
      }}
    >
      <div style={{ padding: "27px 0px 23px" }}>
        <Button
          onClick={showDrawer}
          style={{ backgroundColor: "transparent" }}
          className="border-0"
        >
          <div
            style={{
              backgroundImage: "url(/images/icons/hamburger.svg)",
              width: "21px",
              height: "18px",
            }}
            className="bg-no-repeat bg-center bg-contain"
          />
        </Button>
      </div>

      {/* start of navigation buttons */}
      <div
        className="pb-4 text-center hidden-scrollbar"
        style={{ overflowY: "auto", height: "calc(100vh - 85px)" }}
      >
        {renderMenuItem(
          "Home",
          "home-icon",
          "home",
          menuNameFor,
          () => setMenuNameFor(null), //home - updated to null after menu changes
          () => setMenuNameFor(null),
          "Control all your operations on a summarized, common interface"
        )}



        {userFeatures.map((item) => {
          if (item?.id !== "Api-Dashboard") {
            return renderMenuItem(
              item.name,
              item.icon,
              item.url,
              menuNameFor,
              () => setMenuNameFor(null), //item.url - updated to null after menu changes
              () => setMenuNameFor(null),
              item.description,
              item.submenu,
              item.separate ? 1 : 0
            );
          }
        })}

        {/* start of profile info */}
        <div
          id={profileMenuId}
          className="mb-1 mini-menu-text flex"
          style={{
            backgroundColor: "transparent",
            height: "40px",
            width: "53px",
          }}
          onMouseLeave={() => setMenuNameFor(null)}
          onMouseEnter={() => {
            setMenuNameFor(profileMenuId);
            let miniItemElm = document.getElementById(profileMenuId);
            document.querySelector(
              `#${profileMenuId} .menu-hover-detail`
            ).style.cssText = `${
              document.querySelector(`#${profileMenuId} .menu-hover-detail`)
                .style.cssText
            };top:${getOffset(miniItemElm).top - 120}px`;
          }}
        >
          <Button
            style={{ backgroundColor: "transparent" }}
            className="border-0 h-full"
          >
            <div
              className="bg-no-repeat bg-center bg-contain"
              style={{
                backgroundImage: `url(${
                  ctx?.userInfo?.Image
                    ? "data:image/png;base64," + ctx?.userInfo?.Image
                    : "/images/icons/api-admin-icon-menu.svg"
                })`,
                width: "20px",
                height: "20px",
              }}
            ></div>
          </Button>
          <div
            className="menu-hover-detail menu-label absolute z-30 rounded-lg text-left submenu-mini-menu-text profile-mini-menu"
            style={{
              backgroundColor: "#796ba9",
              opacity: menuNameFor && menuNameFor === profileMenuId ? 1 : 0,
              width:
                menuNameFor && menuNameFor === profileMenuId ? "230px" : "0",
              height:
                menuNameFor && menuNameFor === profileMenuId ? "40px" : "0",
              padding:
                menuNameFor && menuNameFor === profileMenuId ? "10px 0" : "0",
              left: menuNameFor && menuNameFor === profileMenuId ? "53px" : 0,
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <div className="my-auto px-3 rounded-r-lg">
              <div
                className="font-poppins font-medium text-h1"
                style={{ color: "rgba(255, 255, 255, 0.9)" }}
              >
                <div className="text-h1 font-semibold">
                  {ctx?.userInfo?.FullName}
                </div>
                <div className="text-xs opacity-50 font-regular">
                  {ctx?.userInfo?.UserID}
                </div>
                {ctx?.userInfo?.LastLogin ? (
                  <>
                    <div className="text-h1 font-medium mt-3">
                      {FormatDateLocal(ctx?.userInfo?.LastLogin, null)}
                    </div>
                    <div className="text-h1 font-medium opacity-50">
                      Last Login
                    </div>
                  </>
                ) : (
                  " "
                )}
                <div
                  onClick={() => setShowLogoutModal(true)}
                  className="text-h1 font-medium mt-3 pt-3 mb-1 border-t-2 cursor-pointer"
                  style={{ borderColor: "#FFFFFF33" }}
                >
                  Logout
                </div>
                <div className="text-xs font-regular opacity-70 mb-2 text-right">
                  {ctx?.appVersion}
                </div>
              </div>
            </div>
          </div>

          <span
            role="img"
            aria-label="caret-left"
            className="anticon anticon-caret-left relative mx-auto bottom-0"
            style={{
              opacity: menuNameFor && menuNameFor === profileMenuId ? 1 : 0,
              top: "12px",
              left: "-8px",
              color: "#9486c5",
              visibility:
                menuNameFor && menuNameFor === profileMenuId
                  ? "visible"
                  : "hidden",
            }}
          >
            <svg
              viewBox="0 0 1024 1024"
              focusable="false"
              data-icon="caret-left"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M689 165.1L308.2 493.5c-10.9 9.4-10.9 27.5 0 37L689 858.9c14.2 12.2 35 1.2 35-18.5V183.6c0-19.7-20.8-30.7-35-18.5z"></path>
            </svg>
          </span>
        </div>
        {/* end of profile info */}
      </div>
      <Drawer
        // title="Header"
        placement="left"
        width="16.85rem"
        closable={false}
        onClose={onClose}
        visible={visible}
        maskStyle={{ backgroundColor: "transparent" }}
        drawerStyle={{
          backgroundImage: "linear-gradient(to bottom, #674f98, #4266a9)",
        }}
        headerStyle={{ backgroundColor: "transparent", border: 0 }}
        bodyStyle={{ height: "100%", padding: "0px", overflow: "auto" }}
        // style={{ backgroundImage: 'linear-gradient(to bottom, #674f98, #4266a9)' }}
      >
        <div>
          <div className="flex" style={{ padding: "27px 17.55px 23px 20px" }}>
            <img
              src="/images/catamaran-logo.svg"
              alt="logo"
              className="my-auto h-6 w-35"
              style={{ width: "114px" }}
            />
            <Button
              className="flex items-center p-0 border-0 ml-auto justify-end"
              onClick={() => setVisible(false)}
              role="button"
              style={{ backgroundColor: "transparent" }}
            >
              <img
                src="/images/icons/hamburger.svg"
                alt="logo"
                className="h-5 w-5"
              />
            </Button>
          </div>

          <div className="">
            {renderDrawerMenuItem("Home", "home-icon", "home")}

            {ctx.userInfo?.UserFeatures.map((item) => {
              return renderDrawerMenuItem(
                item.name,
                item.icon,
                item.url,
                item.submenu,
                item.separate ? 1 : 0
              );
            })}
          </div>

          <div
            className="pl-5 pr-2 app-user-info text-white border-t-2"
            style={{ borderColor: "#FFFFFF33" }}
          >
            <div
              className={`flex font-poppins text-white text-h1 font-medium leading-normal ${
                showDropdownMenuFor.includes("Profile") ? "pt-3" : "py-3"
              }`}
            >
              <div
                className="my-auto bg-no-repeat bg-center bg-cover"
                style={{
                  backgroundImage: `url(${
                    ctx?.userInfo?.Image
                      ? "data:image/png;base64," + ctx?.userInfo?.Image
                      : "/images/icons/api-admin-icon-menu.svg"
                  })`,
                  width: "20px",
                  height: "20px",
                }}
              ></div>
              <div
                className={`px-3 text-h1 font-medium my-auto ${
                  showDropdownMenuFor.includes("Profile") ? "opacity-50" : ""
                }`}
              >
                {ctx?.userInfo?.FullName}
              </div>
              <button
                size="small"
                onClick={() => handleMenuDropdownClick("Profile")}
                style={{ backgroundColor: "transparent" }}
                className="border-0 px-2 pt-2 pb-1 flex justify-end ml-auto"
              >
                <img
                  alt="setting"
                  src="/images/icons/sidebar-up-arrow1.svg"
                  className="my-auto w-3 h-3 bg-no-repeat bg-center bg-cover "
                  style={{
                    transform: showDropdownMenuFor.includes("Profile")
                      ? "rotate(0deg)"
                      : "rotate(180deg)",
                  }}
                />
              </button>
            </div>
            <div
              className={`${
                showDropdownMenuFor.includes("Profile") ? "" : "hidden"
              } pb-3 ml-7`}
            >
              <div className="my-auto pb-3 pl-1 rounded-r-lg">
                <div
                  className="font-poppins font-medium text-h1"
                  style={{ color: "rgba(255, 255, 255, 0.9)" }}
                >
                  <div
                    className="flex items-center"
                    style={{ justifyContent: "flex-start" }}
                  >
                    <div>
                      <div
                        className="text-xs opacity-50 font-regular whitespace-nowrap	overflow-hidden overflow-ellipsis"
                        style={{ width: "157px" }}
                      >
                        {ctx?.userInfo?.UserID}
                      </div>
                    </div>
                  </div>
                  <div className="text-h1 font-medium mt-3">
                    {FormatDateLocal(ctx?.userInfo?.LastLogin, null)}
                  </div>
                  <div className="text-h1 font-medium opacity-50">
                    Last Login
                  </div>
                  <div
                    onClick={() => setShowLogoutModal(true)}
                    className="text-h1 font-medium pt-3 cursor-pointer"
                    style={{ borderColor: "#FFFFFF33" }}
                  >
                    Logout
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="px-5 app-user-info text-white border-t-2 pl-12 pt-3"
            style={{ borderColor: "#FFFFFF33" }}
          >
            <div className="text-xs font-regular opacity-70 mb-2">
              Version: {ctx?.appVersion}
            </div>
          </div>
        </div>
      </Drawer>

      {/* Delete Rule */}
      <CustomModal
        showModal={showLogoutModal}
        titleText="Logout"
        messageText={`Are you sure you want to logout?`}
        showCancelButton={true}
        handleCancel={() => {
          setShowLogoutModal(false);
        }}
        confirmButtonText={`Yes`}
        handleConfirm={onLogOut}
        isLoading={modalButtonLoading}
      />
    </div>
  );
};
