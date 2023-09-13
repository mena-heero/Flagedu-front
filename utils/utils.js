import { v4 as uuidv4 } from "uuid";

export const namespaced = (namespace, asset) => `${namespace}/${asset}`;

export const buildParams = (params) => {
  const keys = Object.keys(params);
  if (keys.length == 0) return "";
  return (
    "?" +
    keys
      .map((key) => {
        return `${key}=${params[key]}`;
      })
      .join("&")
  );
};

export const makeid = () => {
  return uuidv4();
};

export const deepCopy = (params) => {
  return JSON.parse(JSON.stringify(params));
};

export const modifyHtmlPath = (urlPath) => {
  var u = new URL(urlPath);
  return u.pathname;
};

export const convertBoolean = (val) => {
  if (val == true) {
    return "Yes";
  } else {
    return "No";
  }
};

export const renderLocaleField = (data, fieldName, currentLang) => {
  var d = null;
  if (currentLang == "en") {
    d = data[fieldName + "_en"];
  } else {
    d = data[fieldName];
  }
  if (!d) {
    return data[fieldName];
  } else {
    return d;
  }
};

export const renderLocaleImage = (
  data,
  fieldName,
  currentLang,
  flat = false
) => {
  var img = null;
  if (currentLang == "en") {
    img = data[fieldName + "_en"];
  } else {
    img = data[fieldName];
  }

  if (!img) {
    img = data[fieldName];
  }

  if (flat == true) {
    return img.src;
  } else {
    return img.original.src;
  }
};
