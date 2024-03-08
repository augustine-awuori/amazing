import { Box, BoxProps } from "@chakra-ui/react";

const CardContainer = ({ children }: BoxProps) => (
  <Box borderRadius={10} overflow="hidden">
    {children}
  </Box>
);

export default CardContainer;
