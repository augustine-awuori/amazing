import { Box, Flex, HStack } from "@chakra-ui/react";

import func from "../utils/funcs";
import Text from "../components/Text";
import useAppColorMode from "../hooks/useAppColorMode";
import VerifiedIcon from "./common/VerifiedIcon";

interface Props {
  children?: JSX.Element | string;
  name: string | undefined;
  owner?: string | undefined;
  verified?: boolean;
}

const Footer = ({ children, name, owner, verified }: Props) => {
  const { accentColor } = useAppColorMode();

  const handleNavToMosh = () => func.navTo("https://codewithmosh.com");

  return (
    <Box mt={8} p={4} bg="gray.500" borderRadius="md">
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
      <Text mb={3}>Provided by God</Text>
      <Box>
        <HStack align="center">
          <Text onClick={handleNavToMosh} color={accentColor}>
            Inspired by codewithmosh.com
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default Footer;
