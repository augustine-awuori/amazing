import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { DataError } from "../services/client";
import service from "../services/users";

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
  const [user, setUser] = useState<CompleteUser | undefined>();

  useEffect(() => {
    initUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  async function initUser() {
    if (!userId) return;

    const { data, ok } = await getCompleteUserDetails(userId);
    if (ok) return setUser(data as CompleteUser);
    toast.error(
      (data as DataError).error || "Error fetching complete user details"
    );
  }

  async function getCompleteUserDetails(userId: string) {
    return await service.getUser(userId);
  }

  return user;
};

export default useUser;
