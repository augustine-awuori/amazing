import { signInWithRedirect, signOut, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { authApi, usersApi } from "../services";
import { config } from "../db";

export const userSignOut = () => signOut(config.auth);

export const userSignIn = () =>
  signInWithRedirect(config.auth, new GoogleAuthProvider());

const useGoogleUser = () => {
  const [googleUser] = useAuthState(config.auth);
  const user = authApi.getCurrentUser();

  const combinedUser = {
    _id: user?._id || "",
    name: user?.name || googleUser?.displayName || "",
    avatar: user?.avatar || googleUser?.photoURL || "",
  };

  const saveGoogleUser = async () => {
    if (!user && !googleUser) return;

    if (googleUser && !user)
      return await usersApi.register({
        email: googleUser.email || "",
        name: googleUser.displayName || "",
        avatar: googleUser.photoURL || "",
      });

    if (user && !googleUser) await userSignIn();
    await usersApi.updateUserInfo({
      email: googleUser?.email,
      avatar: googleUser?.photoURL,
    });
  };

  return { combinedUser, googleUser, userSignIn, userSignOut, saveGoogleUser };
};

export default useGoogleUser;
