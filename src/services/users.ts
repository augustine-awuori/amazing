import { toast } from "react-toastify";

import { authApi } from "../services";
import { NewUserData } from "../Pages/RegisterPage";
import { UpdatableUserInfo } from "../hooks/useUser";
import client, { DataError } from "./client";

export const endpoint = "/users";

const register = (info: NewUserData) => client.post(endpoint, info);

const getUser = (userId: string) => client.get(`${endpoint}/${userId}`);

const getUsers = () => client.get(`${endpoint}`);

const updateUserInfo = (userInfo: UpdatableUserInfo) =>
  client.patch(endpoint, userInfo);

const updateChatId = (email: string, googleId: string) =>
  client.patch(`${endpoint}/chatIds`, {
    email,
    chatId: googleId,
  });

const resetToken = async () => {
  const res = await client.get(`${endpoint}/token`);
  if (!res.ok)
    return toast.error(
      (res.data as DataError).error ||
        "Something went wrong. Sorry, You need to need sign out and then in manually"
    );

  authApi.loginWithJwt(res.data as string);
  window.location.href = window.location.href || "/";
};

export default {
  getUser,
  getUsers,
  register,
  resetToken,
  updateChatId,
  updateUserInfo,
};
