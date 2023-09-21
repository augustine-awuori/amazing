import { Box, Flex, HStack, Text } from "@chakra-ui/react";

import VerifiedIcon from "./common/VerifiedIcon";

interface Props {
  children?: any;
  name: string | undefined;
  owner?: string | undefined;
  verified?: boolean;
}

const Footer = ({ children, name, owner, verified }: Props) => (
  <Box mt={8} p={4} bg="gray.600" borderRadius="md">
    <Flex justify="space-between" align="center">
      <Box>
        <HStack align="center">
          {owner && <Text>{owner}</Text>}
          <VerifiedIcon verified={verified} />
        </HStack>
        <Text>&copy; 2023 {name}</Text>
      </Box>
      <Box>{children}</Box>
    </Flex>
  </Box>
);

export default Footer;
