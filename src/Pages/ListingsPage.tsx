import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Category } from "../hooks/useCategories";
import { ListingGrid, Text } from "../components";
import { endpoint } from "../services/listings";
import { useAppColorMode, useListings } from "../hooks";
import useListing, { Listing } from "../hooks/useListing";

interface Props {
  selectedCategory?: Category | null;
  onRequestsPageNav?: () => void;
  searchQuery?: string;
}

const ListingsPage = ({
  onRequestsPageNav,
  selectedCategory,
  ...rest
}: Props) => {
  const navigate = useNavigate();
  const { setListing } = useListing();
  const { data, error, isLoading } = useListings();
  const { accentColor } = useAppColorMode();

  const navigateToDetails = (listing: Listing) => {
    setListing(listing);
    navigate(`${endpoint}/${listing._id}`);
  };

  return (
    <Box px={5}>
      <Text
        mb={3}
        fontSize={20}
        onClick={() => onRequestsPageNav?.()}
        cursor="pointer"
        color={accentColor}
      >
        Tap to see what others are still looking for, you might just have it...
      </Text>
      <ListingGrid
        {...rest}
        error={error}
        isLoading={isLoading}
        listings={data}
        onListingClick={navigateToDetails}
        selectedCategory={selectedCategory || null}
      />
    </Box>
  );
};

export default ListingsPage;
