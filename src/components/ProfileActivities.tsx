import { Box, Center, Flex, Text } from "@chakra-ui/react";

import ProfileActivity from "./ProfileActivity";

interface Props {
  onListingsClick: () => void;
  onRequestsClick: () => void;
  visibility?: "lg" | "md" | "sm";
}

const ProfileActivities = ({
  onListingsClick,
  onRequestsClick,
  visibility,
}: Props) => {
  const computeDisplay = () => {
    if (visibility === "lg")
      return { lg: "block", base: "none", md: "none", sm: "none" };
    else if (visibility === "md")
      return { lg: "none", base: "none", md: "block", sm: "none" };
    else return { lg: "none", base: "none", md: "block", sm: "block" };
  };

  return (
    <Box display={computeDisplay()}>
      <Center>
        <Text fontWeight="bold">Activities</Text>
      </Center>
      <Flex wrap="wrap" justify="center" mt={2}>
        <ProfileActivity
          count={10}
          label="Listings"
          onClick={onListingsClick}
        />
        <ProfileActivity
          count={5}
          label="Requests"
          colorScheme="green"
          onClick={onRequestsClick}
        />
      </Flex>
    </Box>
  );
};

export default ProfileActivities;
