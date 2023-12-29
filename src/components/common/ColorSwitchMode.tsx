import { Switch } from "@chakra-ui/react";

import useAppColorMode from "../../hooks/useAppColorMode";

const ColoModeSwitch = () => {
  const { isDarkMode, toggleColorMode } = useAppColorMode();

  return (
    <Switch
      colorScheme="teal"
      isChecked={isDarkMode}
      onChange={toggleColorMode}
    />
  );
};

export default ColoModeSwitch;
