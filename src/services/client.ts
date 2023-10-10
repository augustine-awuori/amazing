import { ApiResponse, create, HEADERS } from "apisauce";

import auth from "./auth";
import cache from "../utils/cache";

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

const get = apiClient.get;
apiClient.get = async <T, U>(
  url: string,
  params: object | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  axiosConfig: any
): Promise<ApiResponse<T, U>> => {
  const response = await get(url, params, axiosConfig);

  if (response.ok) {
    cache.store(url, response.data);
    return response as ApiResponse<T, U>;
  }

  const data = await cache.get(url);
  return (data ? { ok: true, data } : response) as ApiResponse<T, U>;
};

export interface DataError {
  error?: string;
}

export default apiClient;
