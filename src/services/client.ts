import { create } from "apisauce";

import auth from "./auth";

const apiClient = create({
  baseURL: "https://dry-wave-89045-4354397f63ac.herokuapp.com/api",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = auth.getJwt();

  if (authToken && request.headers) request.headers["x-auth-token"] = authToken;
});

export default apiClient;
