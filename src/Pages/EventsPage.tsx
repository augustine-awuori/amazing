import { useEffect, useState } from "react";
import { Flex, Box, useDisclosure, IconButton } from "@chakra-ui/react";
import { toast } from "react-toastify";

import {
  BookmarkIcon,
  Event,
  EventDetails,
  EventEditForm,
  Image,
  Modal,
  NewPosterForm,
  RSVPForm,
  SearchInput,
  SideBar,
  Text,
} from "../components";
import { CardSkeletons } from "../components/card";
import { CreatedEvent } from "../services/events";
import { useAppColorMode, useEvents } from "../hooks";
import auth from "../services/auth";
import ThreeGridPage from "./ThreeGridPage";
import UpcomingEvents from "../components/UpcomingEvent";
import { AiOutlinePicture } from "react-icons/ai";
import { BsTicket } from "react-icons/bs";
import {
  BiCalendarEvent,
  BiDotsHorizontalRounded,
  BiHomeAlt,
} from "react-icons/bi";
import funcs from "../utils/funcs";
import PostersPage from "./PostersPage";

const items = [
  { icon: <BiHomeAlt />, label: "Events" },
  { icon: <AiOutlinePicture />, label: "Posters" },
  { icon: <BsTicket />, label: "Tickets" },
  { icon: <BiDotsHorizontalRounded />, label: "More" },
];

const EventsPage = () => {
  const [query, setQuery] = useState("");
  const { events, setEvents, isLoading } = useEvents();
  const [selectedItem, setSelectedItem] = useState("Events");
  const { accentColor } = useAppColorMode();
  const [Content, setContent] = useState<JSX.Element>();
  const [markedShown, setShowMarked] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CreatedEvent>();
  const [showDetails, setShowDetails] = useState(false);
  const [showRSVPForm, setShowRSVPForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [viewImage, setViewImage] = useState(false);
  const [createEvent, setCreateEvent] = useState(false);
  const [createPoster, setCreatePoster] = useState(false);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const currentUser = auth.getCurrentUser();

  useEffect(() => {
    setContent(renderContent());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, selectedItem, markedShown, query]);

  const handleClick = (event: CreatedEvent) => {
    setSelectedEvent(event);
    setShowDetails(true);
  };

  const Header = (
    <Flex align="center">
      <Box mr={3} w="100%">
        <SearchInput
          onTextChange={setQuery}
          value={query}
          placeholder={`Search Amazing ${selectedItem}`}
        />
      </Box>
      <IconButton
        aria-label="button"
        icon={<BiDotsHorizontalRounded />}
        mr={3}
        onClick={onOpen}
        borderRadius={10}
      />
      <BookmarkIcon
        aria-label="icon"
        marked={markedShown}
        onClick={() => setShowMarked(!markedShown)}
      />
    </Flex>
  );

  const handleMarkChange = (event: CreatedEvent) => {
    if (!currentUser) return toast.info("Login to see your bookmarks");

    const updated = [...events].map((e) => {
      if (e._id === event._id && event.bookmarks) {
        if (e?.bookmarks?.[currentUser?._id]) {
          delete e.bookmarks[currentUser?._id];
        } else {
          // e.bookmarks.[currentUser?._id] = currentUser?._id;
        }
      }

      return e;
    });

    setEvents(updated);
  };

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setViewImage(true);
  };

  const queried = query
    ? events.filter((e) => e.title.toLowerCase().includes(query.toLowerCase()))
    : events;

  const filtered = queried.filter((event) =>
    markedShown
      ? typeof event?.bookmarks?.[currentUser?._id || ""] === "string"
      : true
  );

  const renderContent = () => {
    switch (selectedItem) {
      case "Events":
        return (
          <>
            {Header}
            {filtered.length ? (
              filtered.map((event, index) => (
                <Event
                  {...event}
                  key={index}
                  onMarkChange={() => handleMarkChange(event)}
                  onClick={() => handleClick(event)}
                  onImageClick={handleImageClick}
                />
              ))
            ) : (
              <Text color="orange.400" textAlign="center">
                None found
              </Text>
            )}
          </>
        );
      case "Tickets":
        return (
          <Box>
            {Header}
            <Text textAlign="center" mt={5}>
              Tickets Coming Soon...
            </Text>
          </Box>
        );
      case "Posters":
        return (
          <Box>
            {Header}
            <PostersPage />
          </Box>
        );
      default:
        return (
          <Box>
            {Header}
            <Text textAlign="center" mt={5}>
              Nothing more
            </Text>
          </Box>
        );
    }
  };

  const handleItemClick = (label: string) => {
    onClose?.();
    setSelectedItem(label);
  };

  const handleEventCreation = () => setCreateEvent(true);

  const handleItemCreation = () => {
    onClose?.();
    if (!auth.getCurrentUser())
      return toast.info(`Please login to create ${selectedItem}`);

    if (selectedItem === "Events") handleEventCreation();
    if (selectedItem === "Posters") setCreatePoster(true);
  };

  const SideBarContent = (
    <SideBar
      Icon={<BiCalendarEvent />}
      buttonLabel={`New ${funcs.removeLastChar(selectedItem)}`}
      items={items}
      onButtonClick={handleItemCreation}
      onItemSelect={handleItemClick}
      pageTitle="events"
      selectedItemLabel={selectedItem}
    />
  );

  const RightSideBarContent = (
    <>
      <Box mb={5}>
        <Text fontWeight="bold" fontSize="lg" mb={4} color={accentColor}>
          Happening Events
        </Text>
        <UpcomingEvents events={[]} />
      </Box>
      <Box mb={5}>
        <Text fontWeight="bold" fontSize="lg" mb={4} color={accentColor}>
          Upcoming Events
        </Text>
        <UpcomingEvents events={events} />
      </Box>
    </>
  );

  const Modals = (
    <>
      <Modal
        title="New Poster"
        content={<NewPosterForm onDone={() => setCreatePoster(false)} />}
        isOpen={createPoster}
        onModalClose={() => setCreatePoster(false)}
      />
      <Modal
        content={<EventEditForm onDone={() => setCreateEvent(false)} />}
        isOpen={createEvent}
        onModalClose={() => setCreateEvent(false)}
        title="Event Creation"
      />
      <Modal
        content={
          <RSVPForm
            eventId={selectedEvent?._id}
            onDone={() => setShowRSVPForm(false)}
          />
        }
        isOpen={showRSVPForm}
        onModalClose={() => setShowRSVPForm(false)}
        title="RSVP Info"
      />
      <Modal
        content={<EventDetails event={selectedEvent} />}
        isOpen={showDetails}
        onModalClose={() => setShowDetails(false)}
        title={selectedEvent?.title}
        primaryBtnLabel="RSVP"
        onPrimaryClick={() => setShowRSVPForm(true)}
      />
      <Modal
        content={
          <Image
            src={selectedImage}
            h="100%"
            objectFit="contain"
            borderRadius={7}
          />
        }
        isOpen={viewImage}
        onModalClose={() => setViewImage(false)}
        title="Image Viewer"
        secondaryBtnLabel="Close"
      />
    </>
  );

  return (
    <ThreeGridPage
      onClose={onClose}
      OtherContents={Modals}
      MainContent={isLoading ? <CardSkeletons isLoading /> : Content}
      RightSideBarContent={RightSideBarContent}
      SideBarContent={SideBarContent}
      isBottomSheetOpen={isOpen}
      onBottomSheetSwipeUp={onOpen}
    />
  );
};

export default EventsPage;
