import jwtDecode from "jwt-decode";

import { ChatUser, UserInfo } from "../db/chat";
import { User } from "../hooks/useUser";
import client from "./client";
import usersService from "./users";

const chatTokenKey = "chat-token";
const tokenKey = "token";

const getJwt = () => localStorage.getItem(tokenKey);

const loginWithJwt = (jwt: string) => localStorage.setItem(tokenKey, jwt);

interface LoginInfo {
  password: string;
  username: string;
}

const login = async ({ username, password }: LoginInfo) => {
  const { data, ok, problem } = await client.post("/auth", {
    username: "@" + username,
    password,
  });

  if (ok) loginWithJwt(data as string);

  return { data, ok, problem };
};

const logout = () => localStorage.removeItem(tokenKey);

const getCurrentUser = () => {
  try {
    const jwt = getJwt();
    if (jwt) {
      const user: User | null = jwtDecode(jwt);
      return user;
    }
  } catch (error) {
    return null;
  }
};

const getUserFullDetails = async (userId: string) =>
  await usersService.getUser(userId);

const setChatUser = (user: ChatUser | UserInfo) =>
  localStorage.setItem(chatTokenKey, JSON.stringify(user));

const getChatUser = (): ChatUser | UserInfo | null => {
  const data = localStorage.getItem(chatTokenKey);

  return data ? JSON.parse(data) : data;
};

const removeChatUser = () => localStorage.removeItem(chatTokenKey);

export default {
  getChatUser,
  getCurrentUser,
  getJwt,
  getUserFullDetails,
  login,
  loginWithJwt,
  logout,
  removeChatUser,
  setChatUser,
};
