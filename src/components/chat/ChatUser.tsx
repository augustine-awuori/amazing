import { Box, Flex } from "@chakra-ui/react";

import { Avatar, Text } from "..";
import { useChatDetails } from "../../hooks";

interface Props {
  onClick?: () => void;
  photoURL: string | null;
  uid: string;
  subTitle?: string | null;
  title: string | null;
  extra?: string;
}

const AppChatUser = ({
  onClick,
  photoURL,
  uid,
  subTitle,
  title,
  extra,
}: Props) => {
  const { chat } = useChatDetails();

  return (
    <Flex
      _hover={{ bg: "whiteAlpha.300" }}
      align="center"
      borderRadius={4}
      bg={chat?.user.uid === uid ? "whiteAlpha.300" : "inherit"}
      cursor="pointer"
      my={0.9}
      onClick={onClick}
      p={0.7}
      w="100%"
    >
      <Avatar
        src={photoURL || ""}
        objectFit="cover"
        w={{ base: 12, md: 8 }}
        h={{ base: 12, md: 8 }}
        mr={{ base: 2, md: 1 }}
        borderRadius="full"
      />
      <Box flex={1}>
        <Text
          fontSize={{ base: "md", md: "sm" }}
          noOfLines={1}
          fontWeight="extrabold"
        >
          {title}
        </Text>
        {subTitle && (
          <Text
            fontSize={{ base: "sm", md: "xs" }}
            noOfLines={1}
            color="whiteAlpha.700"
            lineHeight={1.5}
          >
            {subTitle}
          </Text>
        )}
      </Box>
      {extra && (
        <Text fontSize="xs" ml={1}>
          {extra}
        </Text>
      )}
    </Flex>
  );
};

export default AppChatUser;
