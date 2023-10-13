import { ReactNode } from "react";
import { HeadingProps } from "@chakra-ui/react";

import Heading from "../../components/Heading";

interface Props extends HeadingProps {
  children: ReactNode;
}

const AppHeading = ({ children, ...otherProps }: Props) => (
  <Heading {...otherProps} fontSize="2xl" noOfLines={1}>
    {children}
  </Heading>
);

export default AppHeading;
