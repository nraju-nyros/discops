import axios from "axios";
import querystring from "querystring";

const HttpMethods = {
  Get: "get",
  Put: "put",
  Post: "post",
  Delete: "delete",
};

const ResponseStatus = {
  Success: 0,
  Error: 1,
  InvalidSession: 2,
  UserLocked: 3,
};

export class HttpHelper {
  static #context;

  static SetContext(aContext) {
    HttpHelper.#context = aContext;
  }
  static #MakeHeader(hasContent) {
    let oHeader = {
      "X-AppID": HttpHelper.#context?.AppID,
      "X-AppVersion": HttpHelper.#context?.AppVersion,
      "X-DeviceID": HttpHelper.#context?.DeviceID,
    };
    if (hasContent) oHeader["Content-Type"] = "application/json";

    if (HttpHelper.#context?.SessionID)
      oHeader["X-SessionID"] = HttpHelper.#context.SessionID;

    if (HttpHelper.#context?.AccessToken)
      oHeader["Authorization"] = HttpHelper.#context.AccessToken;

    return oHeader;
  }
  static #MakeUrl(aFunction, aParams) {
    let oURL = HttpHelper.#context?.BaseURL + aFunction;
    if (aParams) oURL += "?" + querystring.stringify(aParams);
    return oURL
      .replace("%2F", "/")
      .replace("%2F", "/")
      .replace("%2F", "/")
      .replace("%2F", "/");
  }

  static HttpGet = async (aFunction, aParams) => {
    const oURL = HttpHelper.#MakeUrl(aFunction, aParams);
    const oHeader = HttpHelper.#MakeHeader(false);

    const oResult = await HttpHelper.#HttpCall(
      HttpMethods.Get,
      oURL,
      oHeader,
      null
    );
    return oResult?.Data;
  };

  static HttpGetList = async (aFunction, aParams) => {
    const oURL = HttpHelper.#MakeUrl(aFunction, aParams);
    const oHeader = HttpHelper.#MakeHeader(false);

    const oResult = await HttpHelper.#HttpCall(
      HttpMethods.Get,
      oURL,
      oHeader,
      null
    );
    return oResult;
  };

  static HttpPost = async (aFunction, aPayload) => {
    const oURL = HttpHelper.#MakeUrl(aFunction);
    const oHeader = HttpHelper.#MakeHeader(true);

    const oResult = await HttpHelper.#HttpCall(
      HttpMethods.Post,
      oURL,
      oHeader,
      aPayload
    );

    if (aFunction === "/WorkOrder") {
      return { data: oResult.Data, id: oResult.Value };
    }
    return oResult?.Data;
  };

  static HttpPut = async (aFunction, aPayload) => {
    const oURL = HttpHelper.#MakeUrl(aFunction);
    const oHeader = HttpHelper.#MakeHeader(true);

    const oResult = await HttpHelper.#HttpCall(
      HttpMethods.Put,
      oURL,
      oHeader,
      aPayload
    );
    return oResult?.Data;
  };

  static HttpDelete = async (aFunction, aParams) => {
    const oURL = HttpHelper.#MakeUrl(aFunction, aParams);
    const oHeader = HttpHelper.#MakeHeader(false);

    const oResult = await HttpHelper.#HttpCall(
      HttpMethods.Delete,
      oURL,
      oHeader,
      null
    );
    return oResult?.Data;
  };

  static AuthForm = async (url, formData) => {
    let oHeader = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    let oData = querystring.stringify(formData);

    let oResponse;
    let errorMessage;
    try {
      oResponse = await axios.post(url, oData, oHeader);
    } catch (e) {
      errorMessage = e.message;
      if (e.response) {
        oResponse = e.response;
        if (oResponse.statusText && oResponse.statusText !== "")
          errorMessage = oResponse.statusText;
      }
    }

    // The .data is from axios
    let oResult = oResponse?.data;
    if (!oResult) throw new Error(errorMessage);

    if (oResult?.error_description) throw Error(oResult?.error_description);

    return oResult?.id_token;
  };

  static #HttpCall = async (aMethod, aUrl, aHeaders, aPayload) => {
    let oResponse;
    let errorMessage;
    try {
      if (aMethod === HttpMethods.Get)
        oResponse = await axios.get(aUrl, { headers: aHeaders });
      else if (aMethod === HttpMethods.Post)
        oResponse = await axios.post(aUrl, aPayload, { headers: aHeaders });
      else if (aMethod === HttpMethods.Put)
        oResponse = await axios.put(aUrl, aPayload, { headers: aHeaders });
      else if (aMethod === HttpMethods.Delete)
        oResponse = await axios.delete(aUrl, { headers: aHeaders });
      // Should never happen
      else errorMessage = "HTTP Method not supported";
    } catch (e) {
      errorMessage = e.message;
      if (e.response) {
        oResponse = e.response;
        if (oResponse.statusText && oResponse.statusText !== "")
          errorMessage = oResponse.statusText;
      }
    }
    if (!oResponse) throw new ServiceUnavailableError(errorMessage);

    if (oResponse.status === 401 || oResponse.status === 403)
      throw new AuthenticationError(errorMessage);

    // The first .data is from axios
    let oResult = oResponse?.data;

    if (oResponse.status === 200) {
      return oResult;
    } else if (!oResult) {
      throw new Error(errorMessage);
    }
    //Session Timeout
    else if (oResult.Status === ResponseStatus.InvalidSession) {
      throw new SessionTimeoutError(
        oResult.Message ? oResult.Message : errorMessage
      );
    }
    //Account Locked
    else if (oResult.Status === ResponseStatus.UserLocked) {
      throw new UserLockedError(
        oResult.Message ? oResult.Message : errorMessage
      );
    }
    // API Error
    else {
      throw new Error(oResult.Message ? oResult.Message : errorMessage);
    }
  };
}

export class ServiceUnavailableError extends Error {
  constructor() {
    super();
    this.message = "Service did not respond in a timely manner.";
  }
}

export class AuthenticationError extends Error {
  constructor() {
    super();
    this.message = "Unauthorized";
  }
}

export class SessionTimeoutError extends Error {
  constructor() {
    super();
    if (!this.message) this.message = "User Session timed out.";
  }
}

export class UserLockedError extends Error {
  constructor() {
    super();
    if (!this.message) this.message = "User Account is locked.";
  }
}