import { useEffect, useState } from "react";

import auth from "../services/auth";

const useCurrentUser = (userId: string | undefined) => {
  const [isTheUser, setUser] = useState(false);
  const currentUser = auth.getCurrentUser();

  useEffect(() => {
    if (userId) setUser(userId === currentUser?._id);
  }, [userId]);

  return isTheUser;
};

export default useCurrentUser;
