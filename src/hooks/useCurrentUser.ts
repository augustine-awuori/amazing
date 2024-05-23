import { useEffect, useState } from "react";

import useUser from "./useUser";

const useCurrentUser = (userId: string | undefined) => {
  const [isTheUser, setUser] = useState(false);
  const currentUser = useUser();

  useEffect(() => {
    if (userId) setUser(userId === currentUser?._id);
  }, [userId, currentUser?._id]);

  return isTheUser;
};

export default useCurrentUser;
