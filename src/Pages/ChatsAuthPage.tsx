import { Box, Flex } from "@chakra-ui/react";
import { BiChat } from "react-icons/bi";
import { Navigate, useNavigate } from "react-router-dom";

import { Button, PageTitle, Text } from "../components";
import { useAppColorMode, useChatUser } from "../hooks";

const ChatsAuthPage = () => {
  const { accentColor, concAccentColor } = useAppColorMode();
  const chat = useChatUser();
  const navigate = useNavigate();

  if (chat.user) return <Navigate to="/chats" />;

  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      w="auto"
      alignItems="center"
      h="65vh"
    >
      <Box px={{ base: 5 }}>
        <PageTitle Icon={<BiChat />} pageTitle="Chats" />
        <Text textAlign="center" my={5} fontSize={15}>
          Authenticating with a Smile! Join the Chat-tastic Fun!
        </Text>
        <Flex justify="space-between" mt={5}>
          <Button
            w="100%"
            bg={accentColor}
            _hover={{ bg: concAccentColor }}
            onClick={() => navigate("login")}
          >
            Sign in
          </Button>
          <Box w={7} />
          <Button w="100%" onClick={() => navigate("register")}>
            Sign Up
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ChatsAuthPage;
