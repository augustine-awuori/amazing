import { Box } from "@chakra-ui/react";

const HomeIcon = "🏠";
const ChatIcon = "💬";
const SearchIcon = "🔍";
const UserIcon = "👤";

const DrawerSideBar = () => {
  return (
    <Box
      width={{ base: "100%", md: "80px" }}
      backgroundColor="#1DA1F2"
      color="white"
      display="flex"
      flexDirection={{ base: "row", md: "column" }}
      alignItems="center"
      justifyContent="center"
      paddingTop={{ base: "0", md: "20px" }}
      paddingBottom={{ base: "20px", md: "0" }}
    >
      <Box>{HomeIcon}</Box>
      <Box>{ChatIcon}</Box>
      <Box>{SearchIcon}</Box>
      <Box>{UserIcon}</Box>
    </Box>
  );
};

export default DrawerSideBar;
