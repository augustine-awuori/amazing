import React, { useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";

interface DismissableInfoProps {
  message: string;
}

const DismissableInfo: React.FC<DismissableInfoProps> = ({ message }) => {
  const [dismissed, setDismissed] = useState(false);

  const handleDismiss = () => setDismissed(true);

  if (dismissed) return null;

  return (
    <Box
      mb={4}
      p={4}
      bg="green.200"
      color="green.800"
      display="flex"
      alignItems="center"
      borderRadius={5}
    >
      <Text flex="1">{message}</Text>
      <Button onClick={handleDismiss} colorScheme="black">
        Cancel
      </Button>
    </Box>
  );
};

export default DismissableInfo;
