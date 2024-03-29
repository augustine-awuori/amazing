import React from "react";
import { Tr as AppTr, BoxProps } from "@chakra-ui/react";

interface Props extends BoxProps {
  children: React.ReactNode;
}

const Tr = ({ children, ...otherProps }: Props) => (
  <AppTr _hover={{ bg: "gray.900" }} cursor="pointer" {...otherProps}>
    {children}
  </AppTr>
);

export default Tr;
