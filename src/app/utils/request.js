import axios from "axios";
import { host } from "./urlApi";

const request = axios.create({
  baseURL: `${host}`,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json, multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Credentials": "true",
  },
});

const requestHandler = (request) => {
  let token = localStorage.getItem("token");

  if (token !== undefined) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
};

const responseHandler = (response) => {
  return response;
};

const expiredTokenHandler = () => {
  localStorage.clear();
  window.location.href = "/auth/login"; //di uncomment saat sudah integrasi api login
  // return error;
};

const errorHandler = (error) => {
  // TODO: Remove this code after you got the response information
  // error.code === 'ERR_NETWORK' should not exist
  if (error.response && error.response.status === 401) {
    expiredTokenHandler(); //di uncomment saat sudah integrasi api login
  }
  return error;
};

request.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

request.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: (url, params = null, headers = {}) => request({ method: "get", url, params, headers }),
  post: (url, data, headers = {}) => request({ method: "post", url, data, headers }),
  put: (url, data, headers) => request({ method: "put", url, data, headers }),
  patch: (url, data, headers) => request({ method: "patch", url, data, headers }),
  delete: (url, data) => request({ method: "delete", url, data }),
  setToken: (token) => {
    if (token) {
      request.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete request.defaults.headers.common.Authorization;
    }
  },
};
