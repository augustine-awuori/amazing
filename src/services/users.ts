import { NewUserData } from "../Pages/RegisterPage";
import { UpdatableUserInfo } from "../hooks/useUser";
import client from "./client";

export const endpoint = "/users";

const register = (info: NewUserData) => client.post(endpoint, info);

const getUser = (userId: string) => client.get(`${endpoint}/${userId}`);

const getUsers = () => client.get(`${endpoint}`);

const updateUserInfo = (userInfo: UpdatableUserInfo, userId: string) =>
  client.patch(`${endpoint}/${userId}`, userInfo);

export default { getUser, getUsers, register, updateUserInfo };
