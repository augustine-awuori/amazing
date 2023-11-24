import { Box, BoxProps } from "@chakra-ui/react";

import Text from "./Text";
import useAppColorMode from "../hooks/useAppColorMode";

interface Props extends BoxProps {
  label: string;
}

const FloatingButtonBox = ({ children, label, ...rest }: Props) => {
  const { accentColor } = useAppColorMode();

  return (
    <Box
      {...rest}
      alignItems="center"
      bgColor={{ base: "transparent", md: accentColor }}
      borderRadius={{ base: 0, md: 30 }}
      color="white"
      cursor="pointer"
      display="flex"
      fontFamily="andika"
      position="fixed"
      px={{ base: 0, md: 3.5 }}
      py={{ base: 0, md: 2 }}
      right="1.25rem"
      transition="bottom 0.3s ease"
      zIndex="100"
    >
      {children}
      <Text display={{ base: "none", md: "inline" }} ml={2}>
        {label}
      </Text>
    </Box>
  );
};

export default FloatingButtonBox;
