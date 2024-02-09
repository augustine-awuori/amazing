import { Box, Flex, Button } from "@chakra-ui/react";
import { AiOutlinePicture } from "react-icons/ai";
import { BsTicket } from "react-icons/bs";
import {
  BiCalendarEvent,
  BiDotsHorizontalRounded,
  BiHomeAlt,
} from "react-icons/bi";

import { Text } from "../";
import { useAppColorMode } from "../../hooks";
import SideItem from "./SideItem";

const items = [
  { icon: <BiHomeAlt />, label: "Home" },
  { icon: <BsTicket />, label: "Tickets" },
  { icon: <AiOutlinePicture />, label: "Posters" },
  { icon: <BiDotsHorizontalRounded />, label: "More" },
];

interface Props {
  selectedItem: string;
  onItemClick: (label: string) => void;
  onEventCreation: () => void;
}

const EventsPageSideBar = ({
  onEventCreation,
  onItemClick,
  selectedItem,
}: Props) => {
  const { accentColor, isDarkMode } = useAppColorMode();

  return (
    <>
      <Box w="100%" pt={3} h="80%">
        <Flex align="center" mb={5} fontSize="xl" justify="center">
          <BiCalendarEvent />
          <Flex ml={1}>
            <Text
              color={isDarkMode ? "inherit" : "gray.900"}
              fontWeight="extrabold"
            >
              campus
            </Text>
            <Text fontWeight="extrabold" color="orange.400">
              events
            </Text>
          </Flex>
        </Flex>
        {items.map(({ icon, label }, index) => (
          <SideItem
            Icon={icon}
            label={label}
            key={index}
            onClick={() => onItemClick(label)}
            selected={selectedItem === label}
          />
        ))}
      </Box>
      <Button
        mt={8}
        borderRadius={30}
        bg={accentColor}
        _hover={{ bg: "orange.400" }}
        w="100%"
        letterSpacing={1}
        onClick={onEventCreation}
      >
        Create Event
      </Button>
    </>
  );
};

export default EventsPageSideBar;
