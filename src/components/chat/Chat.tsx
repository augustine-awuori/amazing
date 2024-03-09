import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Input,
  Spinner,
  useBreakpointValue,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { BsSend } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

import { Avatar, Text } from "../";
import { hideScrollBarCss } from "../../data/general";
import {
  useAppColorMode,
  useChatUser,
  useChatDetails,
  useNoGrid,
  useRealTimeData,
} from "../../hooks";
import chatDb, {
  CHATS_COLLECTION,
  ChatUser,
  RawChatDataDate,
} from "../../db/chat";
import Message from "./Message";

type Message = {
  date: RawChatDataDate;
  id: string;
  senderId: string;
  text: string;
};

const Chat = () => {
  const { chat } = useChatDetails();
  const { accentColor } = useAppColorMode();
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const params = useParams();
  const chatId = chat?.chatId || params.chatId;
  const data = useRealTimeData<{ messages: Message[] }>(
    CHATS_COLLECTION,
    chatId
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const user = useChatUser().user as ChatUser;
  const navigate = useNavigate();
  useNoGrid();

  const isBigScreen = useBreakpointValue({ md: false, lg: true });

  useEffect(() => {
    if (data && chatId && Array.isArray(data?.messages))
      setMessages(data.messages);
    if (isBigScreen) navigate("/chats");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, chatId, isBigScreen]);

  const userId = user?.uid;

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setText(event.target.value);
  };

  const handleSendMessage = async () => {
    if (!text || !chat?.chatId || !user || sending) return;

    setSending(true);
    await chatDb.sendMessage({
      receiver: chat.user as ChatUser,
      sender: user as ChatUser,
      text,
    });
    setSending(false);

    setText("");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleSendMessage();
  };

  return (
    <Box w="100%" pos="relative" bg="white" h="100%" pt={{ base: 20, md: 0 }}>
      {/* Header */}
      <Flex
        align="center"
        py={2}
        px={2}
        justify="space-between"
        boxShadow="1px 0 10px #ccc"
        position="sticky"
        top={0}
        zIndex={999}
        bg="white"
      >
        <Flex align="center">
          <Avatar
            src={chat?.user?.photoURL || ""}
            w={10}
            h={10}
            borderRadius="full"
            mr={3}
          />
          <Box>
            <Text color="gray.600" fontWeight="bold" fontSize="md">
              {chat?.user?.displayName || chat?.user?.email || "amazing.chat"}
            </Text>
            <Text fontSize="xs" color={accentColor}>
              {chat?.user ? chat?.user.email : "Select a chat to display"}
            </Text>
          </Box>
        </Flex>
        <IconButton
          _hover={{ bg: "#ccc" }}
          bg="#ccc"
          borderRadius="full"
          icon={<InfoIcon />}
          aria-label="info-button"
          size="sm"
        />
      </Flex>

      {/* Messages */}
      <Box overflow="scroll" px={1} h="72vh" css={hideScrollBarCss} pt={10}>
        {messages.map((message, index) => (
          <Message
            date={message.date}
            isTheSender={userId === message.senderId}
            key={index}
            textMessage={message.text}
          />
        ))}
      </Box>

      {/* Footer */}
      <Flex w="100%" align="center" bg="gray" bottom={0} p={1}>
        <Input
          borderColor="#fff"
          color="#fff"
          flex={1}
          onChange={handleTextChange}
          onKeyDown={handleKeyPress}
          placeholder="Text message"
          value={text}
        />
        <IconButton
          icon={sending ? <Spinner /> : <BsSend />}
          aria-label="send-button"
          ml={1}
          onClick={handleSendMessage}
        />
      </Flex>
    </Box>
  );
};

export default Chat;
