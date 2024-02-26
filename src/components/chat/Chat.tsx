import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Flex, IconButton, Input } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { BsSend } from "react-icons/bs";

import { Avatar, Text } from "../";
import { hideScrollBarCss } from "../../data/general";
import {
  useAppColorMode,
  useChat,
  useChatDetails,
  useNoGrid,
  useRealTimeChat,
} from "../../hooks";
import chatDb, { CHATS_COLLECTION, RawChatDataDate } from "../../db/chat";
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
  const data = useRealTimeChat<{ messages: Message[] }>(
    CHATS_COLLECTION,
    chat?.chatId
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useChat();
  useNoGrid();

  useEffect(() => {
    if (data && chat?.chatId && Array.isArray(data?.messages))
      setMessages(data.messages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, chat?.chatId]);

  const userId = user?.uid;

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setText(event.target.value);
  };

  const handleMessageSend = async () => {
    if (!text || !chat?.chatId || !user) return;

    await chatDb.sendMessage(chat.chatId, text, chat.user.uid, user.uid);

    setText("");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleMessageSend();
  };

  return (
    <Box w="100%" pos="relative" bg="white" pt={{ base: 20, md: 0 }} h="100%">
      {/* Header */}
      <Flex
        align="center"
        py={2}
        px={2}
        justify="space-between"
        boxShadow="1px 0 10px #ccc"
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
      <Box overflow="scroll" px={1} h="72vh" css={hideScrollBarCss} pb={1}>
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
      <Flex w="100%" align="center" pos="absolute" bg="gray" bottom={0} p={1}>
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
          icon={<BsSend />}
          aria-label="send-button"
          ml={1}
          onClick={handleMessageSend}
        />
      </Flex>
    </Box>
  );
};

export default Chat;
