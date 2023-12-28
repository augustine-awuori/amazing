import { UpdatableUserInfo } from "../hooks/useUser";
import client from "./client";

const endpoint = "/users";

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

const register = ({ avatar, name, username, whatsapp, password }: Props) => {
  const data = new FormData();
  data.append("name", name);
  data.append("username", "@" + username);
  data.append("whatsapp", whatsapp);
  if (password) data.append("password", password);
  if (avatar)
    data.append(
      "avatar",
      new File([avatar], "avatar.jpg", { type: "image/jpeg" })
    );

  return client.post(endpoint, data);
};

const getUser = (userId: string) => client.get(`${endpoint}/${userId}`);

const getUsers = () => client.get(`${endpoint}`);

const updateUserInfo = (userInfo: UpdatableUserInfo, userId: string) =>
  client.patch(`${endpoint}/${userId}`, userInfo);

export default { getUser, getUsers, register, updateUserInfo };
