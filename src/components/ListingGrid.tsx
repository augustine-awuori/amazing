import { Text } from "@chakra-ui/react";

import { Category } from "../hooks/useCategories";
import { Listing } from "../hooks/useListing";
import CardContainer from "./CardContainer";
import CardSkeleton from "./CardSkeleton";
import Grid from "./Grid";
import ListingCard from "./ListingCard";

interface Props {
  error: string | undefined;
  isLoading: boolean;
  listings: Listing[];
  selectedCategory: Category | null;
  onListingClick: (listing: Listing) => void;
}

const ListingGrid = ({
  error,
  isLoading,
  listings,
  onListingClick,
  selectedCategory,
}: Props) => {
  const skeletons = [1, 2, 3, 4, 5, 6];

  const filtered = selectedCategory?._id
    ? listings.filter(
        (listing) => listing.category._id === selectedCategory?._id
      )
    : listings;

  if (error) return <Text>{error}</Text>;

  return (
    <Grid>
      {isLoading &&
        skeletons.map((skeleton) => (
          <CardContainer key={skeleton}>
            <CardSkeleton />
          </CardContainer>
        ))}
      {filtered.map((listing) => (
        <CardContainer key={listing._id}>
          <ListingCard
            listing={listing}
            onClick={() => onListingClick(listing)}
          />
        </CardContainer>
      ))}
    </Grid>
  );
};

export default ListingGrid;
