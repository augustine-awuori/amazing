import { ButtonProps, useBreakpointValue } from "@chakra-ui/react";

import { Button } from "..";

const ShopHeaderButton = ({ children, ...rest }: ButtonProps) => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <Button ml={3} pl={isSmallScreen ? 1.5 : undefined} {...rest}>
      {isSmallScreen ? null : children}
    </Button>
  );
};

export default ShopHeaderButton;
