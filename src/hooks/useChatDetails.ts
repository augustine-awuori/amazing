import { useContext, useEffect, useState } from "react";

import { ChatContext } from "../contexts";
import { useChat } from "../hooks";
import chatDb from "../db/chat";

const useChatDetails = () => {
  const { setChat, chat } = useContext(ChatContext);
  const { user } = useChat();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (chat?.user && user) chatDb.getUserChatMessages(user, chat?.user);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid, chat?.user?.uid]);

  return { chat, setChat, isLoading };
};

export default useChatDetails;
