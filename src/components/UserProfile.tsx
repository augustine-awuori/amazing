import { Badge, Box, Flex } from "@chakra-ui/react";

import { Avatar } from "./common";
import { Text } from "../components";
import {
  useAppColorMode,
  useListings,
  useRequests,
  useShops,
  useTimestamp,
} from "../hooks";
import { MediaQueryUser } from "./common/MediaQuery";
import { getFirstWord } from "../utils/format";

const UserProfile = ({ user }: { user: MediaQueryUser }) => {
  const { shops } = useShops();
  const { data: listings } = useListings();
  const { data: requests } = useRequests();
  const { accentColor } = useAppColorMode();
  const { getDate } = useTimestamp();

  const shopsCount = shops.reduce((total, shop) => {
    if (shop.author._id === user._id) total += 1;

    return total;
  }, 0);

  const listingsCount = listings.reduce((total, listing) => {
    if (listing.author._id === user._id) total += 1;

    return total;
  }, 0);

  const requestsCount = requests.reduce((total, request) => {
    if (request.author._id === user._id) total += 1;

    return total;
  }, 0);

  return (
    <Box>
      <Flex mb={2}>
        <Avatar mr={3} size="md" name={user.name} />
        <Box>
          <Text fontWeight="extrabold" fontSize="1rem">
            {user.name}
          </Text>
          <Text color={accentColor}>{user.username}</Text>
        </Box>
      </Flex>
      {user.isVerified && <Badge colorScheme="green">VERIFIED</Badge>}
      {user.isAdmin && (
        <Badge colorScheme="orange" marginLeft={3}>
          ADMIN
        </Badge>
      )}
      <Text my={2}>
        {getFirstWord(user.name)} joined Amazing on{" "}
        {getDate(user?.timestamp || 0)} with a record of{" "}
        <Text color="blue.300">
          {listingsCount} listings, {requestsCount} requests and {shopsCount}{" "}
          shops.
        </Text>
      </Text>
    </Box>
  );
};

export default UserProfile;
