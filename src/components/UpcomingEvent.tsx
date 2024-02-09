import { Box, Flex } from "@chakra-ui/react";

import { CreatedEvent } from "../services/events";
import { Text } from "./";

const UpcomingEvents = ({ events }: { events: CreatedEvent[] }) => {
  if (events.length)
    return (
      <Box>
        {events.map((event, index) => {
          const turnOuts = event.turnOut.length;

          return (
            <Box mb={2}>
              <Flex>
                <Text>{index + 1}. </Text>
                <Text noOfLines={2}>{event.title}</Text>
              </Flex>
              <Text color="gray.600" ml={3}>
                {turnOuts} {turnOuts <= 1 ? "person" : "people"} going{" "}
                {turnOuts === 0 ? "yet" : ""}
              </Text>
            </Box>
          );
        })}
      </Box>
    );

  return <Text>Having none!</Text>;
};
export default UpcomingEvents;
