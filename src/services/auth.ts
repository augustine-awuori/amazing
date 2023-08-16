import jwtDecode from "jwt-decode";

import client from "./client";

const tokenKey = "token";

const getJwt = () => localStorage.getItem(tokenKey);

const loginWithJwt = (jwt: string) => localStorage.setItem(tokenKey, jwt);

const login = async ({
  username,
  password,
}: {
  password: string;
  username: string;
}) => {
  const { data, ok } = await client.post("/auth", {
    username: "@" + username,
    password,
  });

  if (ok) loginWithJwt(data);

  return { data, ok };
};

const logout = () => localStorage.removeItem(tokenKey);

const getCurrentUser = () => {
  try {
    return jwtDecode(getJwt());
  } catch (error) {
    return null;
  }
};

export default { getCurrentUser, getJwt, login, loginWithJwt, logout };
