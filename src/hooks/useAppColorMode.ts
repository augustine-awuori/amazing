import { useColorMode } from "@chakra-ui/react";

const useAppColorMode = () => {
  const { colorMode } = useColorMode();

  const isDarkMode = colorMode === "dark";

  const accentColor = "orange.400";

  return {
    color: isDarkMode ? "gray.800" : accentColor,
    isDarkMode,
    accentColor,
  };
};

export default useAppColorMode;
