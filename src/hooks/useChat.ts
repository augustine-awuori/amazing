import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

import auth from "../services/auth";
import chatDb, { USER_CHATS_COLLECTION } from "../db/chat";
import config from "../db/config";

const useChatUser = () => {
  const [googleUser] = useAuthState(config.auth);
  const navigate = useNavigate();

  useEffect(() => {
    updateChatUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleUser?.uid]);

  async function updateChatUser() {
    if (!googleUser) return;

    const userFound = (await chatDb.getAllUsers()).find(
      (user) => user.uid === googleUser.uid
    );
    if (userFound) return;

    await Promise.all([
      chatDb.updateChatUser(googleUser.uid, {
        displayName: googleUser.displayName || "",
        email: googleUser.email || "",
        photoURL: googleUser.photoURL || "",
      }),

      chatDb.initChat(googleUser.uid, USER_CHATS_COLLECTION, {}),
    ]);
  }

  const signUpWithGoogleRedirect = async () => {
    try {
      await chatDb.signInWithGoogleRedirect();

      if (googleUser) {
        auth.setChatUser(googleUser);

        const exists = (
          await chatDb.getChat(googleUser.uid, USER_CHATS_COLLECTION)
        ).exists();
        if (!exists) await chatDb.initNewUserChat(googleUser);

        navigate("/chats");
      } else toast.error("Chat couldn't be initialized!");
    } catch (error) {
      toast.error("Google Sign In redirect failed");
    }
  };

  return {
    user: googleUser || auth.getChatUser(),
    signUpWithGoogleRedirect,
  };
};

export default useChatUser;
