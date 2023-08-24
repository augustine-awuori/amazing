import { useContext } from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "./contexts";

export default function useAuth() {
  const context = useContext(AuthContext);

  const user = context?.user;
  const setUser = context?.setUser;

  const logIn = () => {
    try {
      const authToken = localStorage.getItem("token");
      return jwtDecode(authToken);
    } catch (error) {}
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return { user, logIn, logOut };
}
