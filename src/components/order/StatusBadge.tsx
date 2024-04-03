import { Box } from "@chakra-ui/react";

import { Status } from "../../hooks/useStatus";
import { Text } from "..";

interface Props {
  status: Status;
}

const StatusBadge = ({ status: { color, label } }: Props) => (
  <Box
    bg={`${color}.100`}
    px={1.5}
    color={`${color}.500`}
    fontWeight="bold"
    borderRadius={15}
  >
    <Text textAlign="center" fontSize="sm">
      {label}
    </Text>
  </Box>
);

export default StatusBadge;
