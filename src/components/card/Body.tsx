import { CardBody } from "@chakra-ui/react";

import useAppColorMode from "../../hooks/useAppColorMode";

interface Props {
  children: any;
}

const Body = ({ children }: Props) => {
  const { isDarkMode } = useAppColorMode();

  return (
    <CardBody backgroundColor={isDarkMode ? "inherit" : "#f8f4f4"}>
      {children}
    </CardBody>
  );
};

export default Body;
