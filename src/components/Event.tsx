import { Box, Flex } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { GoLocation } from "react-icons/go";

import { BookmarkIcon, Image, Text } from "./";
import { CreatedEvent } from "../services/events";
import { useAppColorMode, useTimestamp } from "../hooks";
import useUser from "../hooks/useUser";

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
  endsAt,
  startsAt,
  title,
}: Props) => {
  const { formatTimestamp } = useTimestamp();
  const { isDarkMode, accentColor } = useAppColorMode();
  const currentUser = useUser();

  const handleBookmarking = () => {
    onMarkChange(_id);
    toast.success("Feature to be fully implemented, stay tuned");
  };

  return (
    <Flex
      display={{ base: "block", md: "flex" }}
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
        borderRadius={15}
        boxShadow="1px 1px 6px #ccc"
        h={40}
        mb={{ base: 3 }}
        mr={3}
        objectFit="cover"
        onClick={() => onImageClick(image)}
        src={image}
        w={{ base: "100%", md: "auto" }}
      />
      <Box flex="1" onClick={onClick}>
        <Text color={accentColor} fontSize="sm" noOfLines={{ base: 1, md: 2 }}>
          {formatTimestamp(startsAt)} - {formatTimestamp(endsAt)}
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
            {fee ? `Ksh ${fee}` : "Free"}
          </Text>
        </Flex>
        <BookmarkIcon
          marked={bookmarks?.[currentUser?._id || ""] ? true : false}
          aria-label="bookmark"
          pos="absolute"
          top={4}
          right={4}
          mb={2}
          onClick={handleBookmarking}
          zIndex={1}
        />
      </Box>
    </Flex>
  );
};

export default Event;
