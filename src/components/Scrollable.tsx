import { Box, BoxProps } from "@chakra-ui/react";

import { scrollBarModifierCss } from "../data/general";

const ScrollableContainer = ({ children, ...otherProps }: BoxProps) => (
  <Box
    whiteSpace="nowrap"
    overflowX="auto"
    css={scrollBarModifierCss}
    {...otherProps}
  >
    {children}
  </Box>
);

export default ScrollableContainer;
