import { create } from "apisauce";

import auth from "./auth";

export const appBaseUrl = "https://kisiiuniversemart.digital/";

const apiClient = create({
  baseURL: "https://dry-wave-89045-4354397f63ac.herokuapp.com/api",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = auth.getJwt();

  if (authToken && request.headers) request.headers["x-auth-token"] = authToken;
});

export interface DataError {
  error?: "";
}

export default apiClient;
