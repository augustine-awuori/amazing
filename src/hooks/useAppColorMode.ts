import { useColorMode } from "@chakra-ui/react";

const useAppColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const isDarkMode = colorMode === "dark";
  const accentColor = "orange.400";

  return {
    accentColor,
    color: isDarkMode ? "gray.800" : accentColor,
    concAccentColor: "orange.500",
    isDarkMode,
    toggleColorMode,
  };
};

export default useAppColorMode;
