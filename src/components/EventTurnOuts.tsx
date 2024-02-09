import { Box, Flex } from "@chakra-ui/react";

import { RSVPFormData } from "./RSVPForm";
import { Avatar, Text } from ".";
import { useAppColorMode } from "../hooks";

interface Props {
  turnOut: RSVPFormData[];
}

const EventTurnOuts = ({ turnOut }: Props) => {
  const { accentColor } = useAppColorMode();

  if (!turnOut.length)
    return <Text color="yellow.700">No one to turn out yet!</Text>;

  return (
    <Box>
      {turnOut.map(({ name, username }) => (
        <Flex align="center" w="100%" mb={3}>
          <Avatar name={name} mr={2} size="md" />
          <Box>
            <Text>{name}</Text>
            {username && (
              <Text fontStyle="italic" color={accentColor}>
                {username}
              </Text>
            )}
          </Box>
        </Flex>
      ))}
    </Box>
  );
};

export default EventTurnOuts;
