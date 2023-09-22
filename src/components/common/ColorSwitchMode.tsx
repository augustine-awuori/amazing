import { HStack, Switch, useColorMode } from "@chakra-ui/react";

import Text from "../../components/Text";
import useAppColorMode from "../../hooks/useAppColorMode";

const ColoModeSwitch = () => {
  const { toggleColorMode } = useColorMode();
  const { isDarkMode } = useAppColorMode();

  return (
    <HStack>
      <Switch
        colorScheme="green"
        isChecked={isDarkMode}
        onChange={toggleColorMode}
      />
      <Text whiteSpace="nowrap">Dark Mode</Text>
    </HStack>
  );
};

export default ColoModeSwitch;
