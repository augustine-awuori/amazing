import { Flex, FlexProps } from "@chakra-ui/react";

import { Text } from ".";
import { useAppColorMode } from "../hooks";

interface Props extends FlexProps {
  Icon: JSX.Element;
  pageTitle: string;
}

const PageTitle = ({ Icon, pageTitle, ...rest }: Props) => {
  const { isDarkMode } = useAppColorMode();

  return (
    <Flex {...rest} align="center" fontSize="xl" justify="center">
      {Icon}
      <Flex ml={1}>
        <Text
          color={isDarkMode ? "inherit" : "gray.900"}
          fontWeight="extrabold"
        >
          amazing
        </Text>
        <Text
          fontWeight="extrabold"
          color="orange.400"
          textTransform="lowercase"
        >
          {pageTitle}
        </Text>
      </Flex>
    </Flex>
  );
};

export default PageTitle;
