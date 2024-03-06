import { Box, Flex, HStack } from "@chakra-ui/react";

import func from "../utils/funcs";
import Text from "../components/Text";
import VerifiedIcon from "./common/VerifiedIcon";

interface Props {
  children?: JSX.Element | string;
  Info?: JSX.Element;
  name: string | undefined;
  owner?: string | undefined;
  verified?: boolean;
}

const Footer = ({ children, name, Info, owner, verified }: Props) => {
  const handleNavToMosh = () => func.navTo("https://codewithmosh.com");

  return (
    <Box mt={8} p={4} bg="gray.500" borderRadius="md">
      <Flex justify="space-between" align="center">
        <Box mb={3}>
          <HStack align="center">
            {owner && <Text>{owner}</Text>}
            <VerifiedIcon verified={verified} />
          </HStack>
          <Text textTransform="capitalize">&copy; 2023 {name}</Text>
          {Info}
        </Box>
        <Box>{children}</Box>
      </Flex>
      <Box>
        <HStack align="center">
          <Text>Provided by God and </Text>
          <Text
            onClick={handleNavToMosh}
            color="whiteAlpha.500"
            cursor="pointer"
          >
            inspired by codewithmosh.com
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default Footer;
