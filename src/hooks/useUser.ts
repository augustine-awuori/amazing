import { useContext, useEffect } from "react";
import { toast } from "react-toastify";

import { DataError } from "../services/client";
import { usersApi } from "../services";
import { UserContext } from "../contexts";
import useGoogleUser from "./useGoogleUser";

export interface OtherAccounts {
  instagram?: string;
  twitter?: string;
  whatsapp?: string;
  youtube?: string;
}

export interface CompleteUser extends User {
  chatIds?: { [email: string]: string };
}

export interface User {
  _id: string;
  aboutMe?: string;
  avatar: string;
  email?: string;
  chatIds?: { [email: string]: string };
  isAdmin: boolean;
  isVerified: boolean;
  name: string;
  otherAccounts: OtherAccounts;
  pushTokens?: { [token: string]: string };
  timestamp: number;
  username: string;
}

export interface UpdatableUserInfo extends OtherAccounts {
  name?: string;
  username?: string;
}

const useUser = (userId?: string) => {
  const { googleUser } = useGoogleUser();
  const { setUser, user } = useContext(UserContext);

  useEffect(() => {
    initUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, googleUser?.uid]);

  async function initUser() {
    if (!userId) {
      if (googleUser) {
        const { ok, data } = await usersApi.register({
          email: googleUser.email || "",
          name: googleUser.displayName || "",
          avatar: googleUser.photoURL || "",
        });

        if (ok) setUser(data as CompleteUser);
      }
      return;
    }

    if (googleUser && !user?.email)
      await usersApi.updateUserInfo({
        email: googleUser?.email,
        avatar: googleUser?.photoURL,
      });

    const { data, ok } = await getCompleteUserDetails(userId);
    if (ok) return setUser(data as CompleteUser);
    toast.error(
      (data as DataError).error || "Error fetching complete user details"
    );
  }

  async function getCompleteUserDetails(userId: string) {
    return await usersApi.getUser(userId);
  }

  return user;
};

export default useUser;
