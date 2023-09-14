import { Box, Center, Flex, Text } from "@chakra-ui/react";

import { useProfileListings, useProfileRequests } from "../../hooks";
import ProfileActivity from "./Activity";

interface Props {
  onListingsClick: () => void;
  onRequestsClick: () => void;
  userId: string;
  visibility?: "lg" | "md" | "sm";
}

const ProfileActivities = ({
  onListingsClick,
  onRequestsClick,
  userId,
  visibility,
}: Props) => {
  const { count: listingsCount } = useProfileListings(userId);
  const { count: requestsCount } = useProfileRequests(userId);

  const computeDisplay = () => {
    if (visibility === "lg")
      return { lg: "block", base: "none", md: "none", sm: "none" };
    else if (visibility === "md")
      return { lg: "none", base: "none", md: "block", sm: "none" };
    else return { lg: "none", base: "block", md: "block", sm: "block" };
  };

  return (
    <Box display={computeDisplay()}>
      <Center>
        <Text fontWeight="bold">Activities</Text>
      </Center>
      <Flex wrap="wrap" justify="center" mt={2}>
        <ProfileActivity
          count={listingsCount}
          label="Listings"
          onClick={onListingsClick}
        />
        <ProfileActivity
          count={requestsCount}
          label="Requests"
          colorScheme="green"
          onClick={onRequestsClick}
        />
      </Flex>
    </Box>
  );
};

export default ProfileActivities;
