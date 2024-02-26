import { Box, Flex } from "@chakra-ui/react";

import { Text } from "../";

const OrSeparator = () => {
  const Line = <Box w="10%" h={0.06} bg="gray.600" />;

  return (
    <Flex align="center" w="100%" justify="center" my={2}>
      {Line}
      <Text mx={2}>or</Text>
      {Line}
    </Flex>
  );
};

export default OrSeparator;
