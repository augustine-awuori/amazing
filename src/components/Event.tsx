import { Box, Flex } from "@chakra-ui/react";
import { GoLocation } from "react-icons/go";

import { BookmarkIcon, Image, Text } from "./";
import { CreatedEvent } from "../services/events";
import { useAppColorMode, useTimestamp } from "../hooks";
import auth from "../services/auth";
import pic from "../assets/shop.jpg";

export interface EventProps {
  _id: string;
  description: string;
  fee: string;
  image: string;
  location: string;
  timestamp: number;
  title: string;
  turnOut: number;
}

interface Props extends CreatedEvent {
  onClick: () => void;
  onImageClick: (src: string) => void;
  onMarkChange: (id: string) => void;
}

const Event = ({
  _id,
  bookmarks,
  description,
  fee,
  image,
  location,
  onClick,
  onImageClick,
  onMarkChange,
  startsAt,
  title,
}: Props) => {
  const { getDate } = useTimestamp();
  const { isDarkMode, accentColor } = useAppColorMode();
  const currentUser = auth.getCurrentUser();

  return (
    <Flex
      _hover={{
        transform: "scale(1.01)",
        transition: "ease .3s",
      }}
      bg={isDarkMode ? "gray.600" : "gray.200"}
      borderRadius={20}
      cursor="pointer"
      my={2}
      pos="relative"
      p={4}
    >
      <Image
        _hover={{ borderRadius: 10 }}
        boxShadow="1px 1px 6px #ccc"
        src={image || pic}
        borderRadius={15}
        h={40}
        objectFit="cover"
        onClick={() => onImageClick(image)}
        mr={3}
      />
      <Box flex="1" onClick={onClick}>
        <Text color={accentColor} fontSize="sm" noOfLines={{ base: 1, md: 2 }}>
          {getDate(startsAt)}
        </Text>
        <Text my={1.5} fontSize="2xl" noOfLines={1}>
          {title}
        </Text>
        <Text noOfLines={2} color="whiteAlpha.700">
          {description}
        </Text>
        <Flex align="center" justify="space-between" mt={2} color="green.400">
          <Flex align="center">
            <GoLocation />
            <Text ml={1} noOfLines={1}>
              {location}
            </Text>
          </Flex>
          <Text fontWeight="extrabold" color={accentColor} flexWrap="nowrap">
            Ksh {fee}
          </Text>
        </Flex>
      </Box>
      <BookmarkIcon
        marked={bookmarks[currentUser?._id || ""] ? true : false}
        aria-label="bookmark"
        pos="absolute"
        right={4}
        mb={2}
        onClick={() => onMarkChange(_id)}
      />
    </Flex>
  );
};

export default Event;
