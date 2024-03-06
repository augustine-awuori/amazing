import { useContext, useEffect, useState } from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ChatContext } from "../contexts";
import { useChatUser } from "../hooks";
import chatDb, { ChatUser, UserInfo } from "../db/chat";

const useChatDetails = () => {
  const [isLoading, setLoading] = useState(false);
  const [isLoadingUsers, setLoadingUsers] = useState(false);
  const [users, setUsers] = useState<ChatUser[]>([]);
  const { setChat, chat } = useContext(ChatContext);
  const { user: currentChatUser } = useChatUser();
  const navigate = useNavigate();
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    setLoading(true);
    if (chat?.user && currentChatUser)
      chatDb.prepareChatMessages(currentChatUser as UserInfo, chat?.user);
    setLoading(false);
    initUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(currentChatUser as ChatUser)?.uid, chat?.user?.uid]);

  async function initUsers() {
    setLoadingUsers(true);
    setUsers(await chatDb.getAllUsers());
    setLoadingUsers(false);
  }

  const navigateToChats = (chatId: string) => {
    const baseRoute = "/chats";
    navigate(isSmallScreen ? `${baseRoute}/${chatId}` : baseRoute);
  };

  const onStartChat = async (chatUser: ChatUser) => {
    if (!currentChatUser) {
      toast.info("Chatting awaits, login to continue!");
      return navigate("/chats/auth");
    }

    const currentUser = users.find(
      ({ uid }) => uid === (currentChatUser as ChatUser)?.uid
    );

    if (!currentUser)
      return toast.error("Error your chat account isn't properly set");

    if (!chatUser) return toast.error("Error finding seller's chat!");

    toast.loading("Initializing chat...");
    await chatDb.prepareChatMessages(currentUser, chatUser);
    toast.dismiss();

    const chatId = chatDb.getChatIdOf(currentUser.uid, chatUser.uid);
    setChat({ user: chatUser, chatId });
    navigateToChats(chatId);
  };

  return { chat, onStartChat, setChat, isLoading, isLoadingUsers, users };
};

export default useChatDetails;
