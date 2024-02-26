import { useEffect, useRef } from "react";
import { Box, Flex } from "@chakra-ui/react";

import { RawChatDataDate } from "../../db/chat";
import { Text } from "..";
import { useTimestamp } from "../../hooks";

interface Props {
  isTheSender: boolean;
  textMessage: string;
  date: RawChatDataDate;
}

const Message = ({ date, isTheSender, textMessage }: Props) => {
  const { getTimeFromRawDate } = useTimestamp();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [textMessage]);

  return (
    <Box ref={ref} my={1} textAlign={isTheSender ? "right" : "left"}>
      <Flex
        p={1}
        maxW="auto"
        borderRadius={7}
        borderBottomRightRadius={isTheSender ? 0 : 5}
        borderBottomLeftRadius={isTheSender ? 5 : 0}
        bg={isTheSender ? "dodgerblue" : "gray"}
        display="inline-flex"
      >
        <Text>{textMessage}</Text>
      </Flex>
      <Text
        fontSize="xs"
        textTransform="lowercase"
        color={isTheSender ? "dodgerblue" : "gray"}
      >
        {getTimeFromRawDate(date)}
      </Text>
    </Box>
  );
};

export default Message;
