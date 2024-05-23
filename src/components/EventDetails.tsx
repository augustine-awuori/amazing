import { useState } from "react";
import { toast } from "react-toastify";
import { Box, Flex } from "@chakra-ui/react";
import { GoLocation } from "react-icons/go";
import { BiGroup } from "react-icons/bi";

import {
  BookmarkIcon,
  Button,
  EventEditForm,
  EventTurnOuts,
  Modal,
  Text,
} from "./";
import { CreatedEvent } from "../services/events";
import {
  useAppColorMode,
  useCurrentUser,
  useEvents,
  useTimestamp,
  useUser,
} from "../hooks";

interface Props {
  event?: CreatedEvent;
}

const EventDetails = ({ event }: Props) => {
  const { accentColor } = useAppColorMode();
  const { formatTimestamp } = useTimestamp();
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [showTurnOut, setShowTurnOut] = useState(false);
  const helper = useEvents();
  const isTheAuthor = useCurrentUser(event?.author._id);
  const currentUser = useUser();

  if (!event)
    return (
      <Text color="red.400" textAlign="center">
        Error!! Retry!!
      </Text>
    );

  const { bookmarks, description, startsAt, endsAt, turnOut, location } = event;

  const closeConfirmDeleteModal = () => setConfirmDeletion(false);

  return (
    <Box>
      <Modal
        content={<EventTurnOuts turnOut={turnOut} />}
        isOpen={showTurnOut}
        onModalClose={() => setShowTurnOut(false)}
        title="Event Turnout"
      />
      <Modal
        content={<Text>Are you sure you want to delete this event?</Text>}
        isOpen={confirmDeletion}
        onModalClose={closeConfirmDeleteModal}
        title="Confirm Action"
        primaryBtnLabel="I'm Sure"
        onPrimaryClick={() =>
          helper.deleteEvent(event, closeConfirmDeleteModal)
        }
        secondaryBtnLabel="Not, really"
      />
      <Modal
        content={
          <EventEditForm
            event={event}
            onDone={() => setUpdateModalOpen(false)}
          />
        }
        isOpen={updateModalOpen}
        onModalClose={() => setUpdateModalOpen(false)}
        title="Event Update"
      />
      <Text mb={2} textAlign="center" color={accentColor}>
        {formatTimestamp(startsAt)} - {formatTimestamp(endsAt)}
      </Text>
      <Text>{description}</Text>
      <Flex
        mt={2}
        align="center"
        justify="space-between"
        color="green.400"
        fontWeight="bold"
      >
        <Flex align="center">
          <GoLocation /> <Text ml={2}>{location}</Text>
        </Flex>
        <BookmarkIcon
          aria-label="bookmark-icon"
          onClick={() =>
            toast.success("Feature to be fully implemented, stay tuned")
          }
          marked={bookmarks?.[currentUser?._id || ""] ? true : false}
        />
      </Flex>

      <Flex
        align="center"
        mt={3}
        onClick={() => setShowTurnOut(true)}
        cursor="pointer"
      >
        <BiGroup />
        <Text ml={2} color={accentColor}>
          {turnOut.length} {turnOut.length === 1 ? "person" : "people"} to show
          up
        </Text>
      </Flex>
      <Text mt={1} fontWeight="extrabold" color="green.400">
        Ksh {event.fee}
      </Text>
      <Flex
        display={isTheAuthor ? "flex" : "none"}
        mt={3}
        w="100%"
        justify="space-between"
      >
        <Button
          w="100%"
          bg="green.300"
          _hover={{ bg: "green.400" }}
          onClick={() => setUpdateModalOpen(true)}
        >
          Update
        </Button>
        <Box w={5} />
        <Button
          w="100%"
          bg="red.300"
          _hover={{ bg: "red.400" }}
          onClick={() => setConfirmDeletion(true)}
        >
          Delete
        </Button>
      </Flex>
    </Box>
  );
};

export default EventDetails;
