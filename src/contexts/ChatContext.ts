import { createContext } from "react";

import { UserInfo } from "../db/chat";

export type ChatDetails = { user: UserInfo; chatId: string };

interface Value {
  chat?: ChatDetails;
  setChat: (chat?: ChatDetails) => void;
}

export const ChatContext = createContext<Value>({
  chat: undefined,
  setChat: () => {},
});

ChatContext.displayName = "Chat Context";

export default ChatContext;
