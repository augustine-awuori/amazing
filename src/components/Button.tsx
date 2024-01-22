import { Button, ButtonProps } from "@chakra-ui/react";

import { fontFamily } from "../data/typography";

const AppButton = ({ children, ...otherProps }: ButtonProps) => (
  <Button {...otherProps} cursor="pointer" fontFamily={fontFamily}>
    {children}
  </Button>
);

export default AppButton;
