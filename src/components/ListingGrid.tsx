import { SimpleGrid, Text } from "@chakra-ui/react";

import { Category } from "../hooks/useCategories";
import ListingCard from "./ListingCard";
import ListingCardContainer from "./ListingCardContainer";
import ListingCardSkeleton from "./ListingCardSkeleton";
import useListing, { Listing } from "../hooks/useListings";

interface Props {
  selectedCategory: Category | null;
}

const ListingGrid = ({ selectedCategory }: Props) => {
  const { error, isLoading, data: listings } = useListing();
  const skeletons = [1, 2, 3, 4, 5, 6];

  const handleClick = (listing: Listing) => {
    console.log(listing);
  };

  const filtered = selectedCategory?._id
    ? listings.filter(
        (listing) => listing.category._id === selectedCategory?._id
      )
    : listings;

  if (error) return <Text>{error}</Text>;

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      padding="10px"
      spacing={6}
    >
      {isLoading &&
        skeletons.map((skeleton) => (
          <ListingCardContainer key={skeleton}>
            <ListingCardSkeleton />
          </ListingCardContainer>
        ))}
      {filtered.map((listing) => (
        <ListingCardContainer key={listing._id}>
          <ListingCard listing={listing} onClick={() => handleClick(listing)} />
        </ListingCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default ListingGrid;
