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
