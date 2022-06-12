import moment from "moment";

export const GetMomentDateObj = (date) => {
  let parsedDate = moment(date);
  return parsedDate;
};

export const FormatDate = (text, value) => {
  if (text) {
    return moment(text).format("MMM DD, YYYY, HH:mm A");
  } else {
    return value;
  }
};

export const FormatDateLocal = (text, value) => {
  if (text) {
    return moment
      .utc(text)
      .utcOffset(moment().utcOffset())
      .format("MMM DD, YYYY, hh:mm A");
  } else {
    return value;
  }
};

export const FormatDateLocalWithoutTime = (text, value) => {
  if (text) {
    return moment
      .utc(text)
      .utcOffset(moment().utcOffset())
      .format("MMM DD, YYYY");
  } else {
    return value;
  }
};

export const GetBase64 = (file) => {
  return new Promise((resolve) => {
    let baseURL = "";
    // Make new FileReader
    let reader = new FileReader();
    // Convert the file to base64 text
    const acceptFileTypes =
      /^image\/(gif|jpe?g|png)$|^application\/(csv|pdf|msword|(vnd\.(ms-|openxmlformats-).*))$|^text\/plain$/i;

    if (file && file.type.match(acceptFileTypes)) {
      reader?.readAsDataURL(file);
      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    }
  });
};

export const GetFirstChar = (value) => {
  if (!value) {
    return;
  }
  let splittedWords = value.split(" ");
  let initials = "";
  splittedWords.forEach((x) => {
    initials = initials + x.charAt(0);
  });
  return initials.slice(0, 3);
};

/*

To validate file 
params
- ctx = Context
- file = file to validate
- maxSize = Number - max size of the file to allow in MB
- allowedFiles = Array - check the file extension - default is set to jpg, jpeg, png, bmp, gif

*/

export const ValidateFile = (
  ctx,
  file,
  maxSize = process.env.REACT_APP_MAX_UPLOAD_SIZE,
  allowedFiles = [
    "jpg",
    "png",
    "jpeg",
    "bmp",
    "gif",
    "pdf",
    "txt",
    "doc",
    "docx",
  ]
) => {
  const fileSize = file?.size / 1024 / 1024;
  const regex = new RegExp(allowedFiles.join("|"), "gi");
  if (!file?.name.match(regex)) {
    // ctx.showToastAlert({
    //   type: "error",
    //   message: `You can only upload ${allowedFiles.join(", ")} files.`,
    // });
    return false;
  } else if (fileSize > maxSize) {
    // ctx.showToastAlert({
    //   type: "error",
    //   message: `You can upload image up to size ${maxSize}MB.`,
    // });
    return false;
  }
  return true;
};

export const FirstLetterUppercase = (value) => {
  if (value) {
    let lowerCase = value.toLowerCase();
    return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
  }
};

export const ReplaceCharToStrigify = (data) => {
  let value = data.replace(/\r?\n?/g, "");
  if (isJson(value)) {
    let parsedValue = JSON.parse(value);
    return (
      <pre className="custom-scrollbar font-semibold text-h1 font-poppins mb-1">
        {JSON.stringify(parsedValue, null, 2)}
      </pre>
    );
  } else {
    return (
      <pre className="custom-scrollbar font-semibold text-h1 font-poppins mb-1">
        {data}
      </pre>
    );
  }
};

function isJson(object) {
  try {
    JSON.parse(object);
  } catch (e) {
    return false;
  }
  return true;
}

export const DownloadFileBlob = (fileApiRes, fileName) => {
  const url = window.URL.createObjectURL(new Blob([fileApiRes.data]));
  var a = document.createElement("a"); //Create <a>
  a.href = url;
  if (fileApiRes.request.getResponseHeader("Content-Disposition"))
    // check if server sends exposed Content Disposition header and fetch filename from there.
    a.download = fileApiRes.request
      .getResponseHeader("Content-Disposition")
      .split(";")[1]
      .split("=")[1]
      .replaceAll('"', "");
  else a.download = fileName; //File name Here
  document.body.appendChild(a);
  a.click(); //Downloaded file
  document.body.removeChild(a);
};

export const Base64URLEncode = (str) => {
  return str
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
};

export const stripLeadingZeros = (string) => {
  const regExp = /[a-zA-Z]/g;
  if (regExp.test(string)) {
    return string;
  } else {
    var number = string.replace(/\b0+/g, "");
    return number;
  }
};
