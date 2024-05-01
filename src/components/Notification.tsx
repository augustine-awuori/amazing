import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

import { Image, Text } from "../components";

import { User } from "../hooks/useUser";
import img from "../assets/logo.png";

interface Base {
  title: string;
  description: string;
}

export interface Notification extends Base {
  _id: string;
  from: User;
  read: boolean;
  to: User;
}

export interface NewNotification extends Base {
  to: string;
}

const NotificationComp = ({ description, from, read, title }: Notification) => {
  const [noOfLines, setNoOfLines] = useState(1);

  const color = read ? "gray.500" : "inherit";

  return (
    <Flex mb={3} px={3}>
      <Image
        mt={1}
        src={from.avatar || img}
        borderRadius="full"
        w={9}
        h={9}
        mr={3}
      />
      <Box>
        <Text fontWeight="bold" color={color}>
          {title}
        </Text>
        <Text
          noOfLines={noOfLines}
          color={color}
          onClick={() => setNoOfLines(10)}
        >
          {description}
        </Text>
      </Box>
    </Flex>
  );
};

export default NotificationComp;
