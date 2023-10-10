import { useColorMode } from "@chakra-ui/react";

const useAppColorMode = () => {
  const { colorMode } = useColorMode();

  const isDarkMode = colorMode === "dark";
  const accentColor = "orange.400";

  return {
    concAccentColor: "orange.500",
    color: isDarkMode ? "gray.800" : accentColor,
    isDarkMode,
    accentColor,
  };
};

export default useAppColorMode;
