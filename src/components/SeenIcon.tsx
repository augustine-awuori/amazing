import { HStack, Icon } from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";

import Text from "./Text";

interface Props {
  count?: number;
}

const SeenIcon = ({ count = 0 }: Props) => (
  <HStack pl={2}>
    <Icon as={FaEye} boxSize={3} p={0} m={0} />
    <Text fontSize="sm" p={0}>
      {count}
    </Text>
  </HStack>
);

export default SeenIcon;
