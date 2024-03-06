import { useEffect, useState } from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { hideScrollBarCss } from "../../data/general";
import { Text } from "../";
import {
  useChatUser,
  useChatDetails,
  useRealTimeData,
  useTimestamp,
} from "../../hooks";
import AppChatUser from "./ChatUser";
import chatDb, {
  USER_CHATS_COLLECTION,
  RawChat,
  RawChatData,
  UserInfo,
  ChatUser,
} from "../../db/chat";

const Chats = ({ query }: { query: string }) => {
  const [chats, setChats] = useState<RawChatData[]>([]);
  const { getTimeFromRawDate } = useTimestamp();
  const { setChat, isLoading } = useChatDetails();
  const { user } = useChatUser();
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const rawData = useRealTimeData<RawChat>(
    USER_CHATS_COLLECTION,
    (user as ChatUser)?.uid
  );
  const navigate = useNavigate();

  useEffect(() => {
    setChats(chatDb.getCleanChats(rawData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(user as ChatUser)?.uid, rawData, isLoading, query]);

  const handleUserClick = (user: UserInfo, chatId: string) => {
    setChat({ user, chatId });
    if (isSmallScreen) navigate(`/chats/${chatId}`);
  };

  const queried = query
    ? chats.filter(
        (chat) =>
          chat.userInfo.displayName
            ?.toLowerCase()
            .includes(query.toLowerCase()) ||
          chat.userInfo.email?.toLowerCase().includes(query.toLowerCase())
      )
    : chats;

  const Container = ({ children }: { children: React.ReactNode }) => (
    <Box mt={3} overflowY="scroll" h="70vh" css={hideScrollBarCss}>
      {children}
    </Box>
  );

  if (!user)
    return (
      <Container>
        <Text textAlign="center">Loading your login details...</Text>
      </Container>
    );

  if (isLoading)
    return (
      <Container>
        <Text>Loading chats...</Text>
      </Container>
    );

  if (!queried.length)
    return (
      <Container>
        <Text textAlign="center">Your chats will appear here</Text>
      </Container>
    );

  return (
    <Container>
      {queried
        .filter((chat) => chat.lastMessage?.text)
        .sort((a, b) => b?.date?.seconds - a?.date?.seconds)
        .map((chat, index) => {
          const { displayName, photoURL, uid } = chat.userInfo;
          const chatId = chatDb.getChatIdOf((user as ChatUser).uid, uid);

          return (
            <AppChatUser
              extra={getTimeFromRawDate(chat.date)}
              key={index}
              onClick={() => handleUserClick(chat.userInfo, chatId)}
              photoURL={photoURL}
              uid={chat.userInfo.uid}
              subTitle={chat.lastMessage?.text}
              title={displayName}
            />
          );
        })}
    </Container>
  );
};

export default Chats;
