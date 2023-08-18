import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}

const CardContainer = ({ children }: Props) => (
  <Box borderRadius={10} overflow="hidden">
    {children}
  </Box>
);

export default CardContainer;
