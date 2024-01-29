import { UpdatableUserInfo } from "../hooks/useUser";
import client from "./client";

export const endpoint = "/users";

interface Props {
  aboutMe?: string;
  avatar?: string;
  coverPhoto?: string;
  instagram?: string;
  name: string;
  twitter?: string;
  username: string;
  youtube?: string;
  whatsapp: string;
  password?: string;
}

const register = (info: Props) =>
  client.post(endpoint, { ...info, username: `@${info.username}` });

const getUser = (userId: string) => client.get(`${endpoint}/${userId}`);

const getUsers = () => client.get(`${endpoint}`);

const updateUserInfo = (userInfo: UpdatableUserInfo, userId: string) =>
  client.patch(`${endpoint}/${userId}`, userInfo);

export default { getUser, getUsers, register, updateUserInfo };
