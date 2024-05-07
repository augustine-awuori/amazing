import { useState } from "react";
import { Box } from "@chakra-ui/react";

import { Heading, Text } from "../components";
import { useNotifications } from "../hooks";
import NotificationComp from "../components/Notification";
import TextSwitch from "../components/common/TextSwitch";

const NotificationsPage = () => {
  const { notifications } = useNotifications();
  const [filterIndex, setFilterIndex] = useState(0);
 
  const filters = ["All", "Unread"];

  const filtered =
    filters[filterIndex].toLowerCase() === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  return (
    <Box mt={{ md: 10 }} maxWidth={500} mx="auto">
      <TextSwitch labels={filters} onSwitch={setFilterIndex} />
      <Heading my={2} textAlign="center" fontSize="1.25rem">
        Amazing Notifications
      </Heading>
      <Box mt={10}>
        {filtered.length ? (
          filtered.map((notification, index) => (
            <NotificationComp {...notification} key={index} />
          ))
        ) : (
          <Text textAlign="center" marginTop={20}>
            You don't have any
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default NotificationsPage;
