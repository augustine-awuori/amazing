import { create, HEADERS } from "apisauce";

import auth from "./auth";

export const appBaseUrl = "https://kisiiuniversemart.digital/";
export const authTokenKey = "x-auth-token";
export interface Headers extends HEADERS {}

const apiClient = create({
  baseURL: "https://dry-wave-89045-4354397f63ac.herokuapp.com/api",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = auth.getJwt();

  if (authToken && request.headers) request.headers[authTokenKey] = authToken;
});

export interface DataError {
  error?: "";
}

export default apiClient;
