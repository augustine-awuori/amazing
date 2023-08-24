import { useEffect, useState } from "react";

// import useAuth from "../auth/useAuth";
import auth from "./services/auth";

export default (userId) => {
  const [isCurrentUser, setIsCurrentUser] = useState();
  //   const { user } = useAuth();

  //   useEffect(() => {
  //     setIsCurrentUser(user?._id === userId);
  //   }, [userId, user?._id]);

  return isCurrentUser;
};
