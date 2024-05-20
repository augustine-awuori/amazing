import { useEffect } from "react";
import { signInWithRedirect, signOut, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { authApi, usersApi } from "../services";
import { config } from "../db";
import { User } from "./useUser";
import useProfileUser from "./useProfileUser";

export const userSignOut = () => signOut(config.auth);

export const userSignIn = () =>
  signInWithRedirect(config.auth, new GoogleAuthProvider());

const useGoogleUser = () => {
  const { profileUser, setProfileUser } = useProfileUser();
  const [googleUser] = useAuthState(config.auth);
  const user = authApi.getCurrentUser();

  useEffect(() => {
    saveGoogleUser();
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleUser, user?._id]);

  async function init() {
    if (!user?._id || profileUser) return;

    const res = await usersApi.getUser(user._id);
    if (!res.ok) return;

    setProfileUser(res.data as User);
  }

  const combinedUser = {
    _id: user?._id || "",
    name: user?.name || googleUser?.displayName || "",
    avatar: user?.avatar || googleUser?.photoURL || "",
  };

  async function saveGoogleUser() {
    if (!user && !googleUser) return;

    if (googleUser && !user)
      return await usersApi.register({
        email: googleUser.email || "",
        name: googleUser.displayName || "",
        avatar: googleUser.photoURL || "",
      });

    if (!profileUser?.email)
      await usersApi.updateUserInfo({
        email: googleUser?.email,
        avatar: googleUser?.photoURL,
      });
  }

  return { combinedUser, googleUser, userSignIn, userSignOut, saveGoogleUser };
};

export default useGoogleUser;
