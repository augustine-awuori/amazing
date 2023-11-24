import { Box, HeadingProps } from "@chakra-ui/react";

import Heading from "./Heading";
import Image from "./IllustratorImage";
import searchNotFound from "../assets/search-not-found.png";

interface Props extends HeadingProps {
  show?: boolean | string;
}

const Info = ({ children, fontSize = "xl", show }: Props) => (
  <Box justifyContent="center" alignItems="center" height="100%" w="100%">
    {children ? (
      <Heading
        color={children ? "green.300" : "yellow.400"}
        fontSize={fontSize}
        show={show ? true : false}
        textAlign="center"
      >
        {children}
      </Heading>
    ) : (
      <Image src={searchNotFound} />
    )}
  </Box>
);

export default Info;
