import { HeadingProps } from "@chakra-ui/react";

import Heading from "./Heading";

interface Props extends HeadingProps {
  show?: boolean | string;
}

const Info = ({ children, fontSize = "xl", show }: Props) => (
  <Heading
    color={children ? "green.300" : "yellow.400"}
    fontSize={fontSize}
    show={show ? true : false}
  >
    {children || "None found"}
  </Heading>
);

export default Info;
