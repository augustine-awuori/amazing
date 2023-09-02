import { RequestInfo } from "../hooks/useRequest";
import client from "./client";

export const endpoint = "/requests";

const create = ({ category, description, title }: RequestInfo) =>
  client.post(endpoint, { title, description, category });

const deleteRequest = (requestId: string) =>
  client.delete(`${endpoint}/${requestId}`);

const get = () => client.get(endpoint);

const getRequest = (requestId: string) =>
  client.get(`${endpoint}/${requestId}`);

const getUserRequests = (userId: string) => client.get(`${endpoint}/${userId}`);

const update = (requestInfo: RequestInfo, requestId: string) =>
  client.put(`${endpoint}/${requestId}`, requestInfo);

export default {
  create,
  deleteRequest,
  get,
  getRequest,
  getUserRequests,
  update,
};
