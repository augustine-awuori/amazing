import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

import { Chat, ChatList } from "../components/chat";
import { useChat, useNoGrid } from "../hooks";

const ChatsPage = () => {
  const { user: chatUser } = useChat();
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  useNoGrid();

  if (!chatUser) return <Navigate to="/chats/auth" />;

  if (isSmallScreen)
    return (
      <Box
        h="100vh"
        w="100%"
        pt={20}
        borderLeftRadius={10}
        bg="gray"
        overflowY="hidden"
      >
        <ChatList />
      </Box>
    );

  return (
    <Flex h="100vh" pt={20} bg="#ccc" px={2} borderRadius={10} pb={2}>
      <Box h="100%" w="30%" borderLeftRadius={10} bg="gray" overflowY="hidden">
        <ChatList />
      </Box>
      <Flex
        bg="white"
        h="100%"
        flex={1}
        overflowY="hidden"
        borderRightRadius={10}
      >
        <Chat />
      </Flex>
    </Flex>
  );
};

export default ChatsPage;
