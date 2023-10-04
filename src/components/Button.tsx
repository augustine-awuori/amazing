import { Button, ButtonProps } from "@chakra-ui/react";

const AppButton = ({ children, ...otherProps }: ButtonProps) => (
  <Button {...otherProps} cursor="pointer" fontFamily="andika">
    {children}
  </Button>
);

export default AppButton;
