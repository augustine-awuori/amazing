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
      mt={0.5}
      onClick={onClick}
      p={0.5}
      w="100%"
    >
      <Avatar
        src={photoURL || ""}
        objectFit="cover"
        w={8}
        h={8}
        mr={1}
        borderRadius="full"
      />
      <Box flex={1}>
        <Text fontSize="sm" noOfLines={1}>
          {title}
        </Text>
        {subTitle && (
          <Text
            fontSize="xs"
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
