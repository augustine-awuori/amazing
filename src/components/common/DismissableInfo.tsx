import { FC, useState } from "react";
import { Box } from "@chakra-ui/react";

import { Button, Text } from "../../components";

interface Props {
  info: string;
}

const DismissableInfo: FC<Props> = ({ info }) => {
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
      <Text flex="1">{info}</Text>
      <Button onClick={handleDismiss} colorScheme="black">
        Cancel
      </Button>
    </Box>
  );
};

export default DismissableInfo;
