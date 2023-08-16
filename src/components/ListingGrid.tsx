import { SimpleGrid, Text } from "@chakra-ui/react";

import ListingCard from "./ListingCard";
import ListingCardContainer from "./ListingCardContainer";
import ListingCardSkeleton from "./ListingCardSkeleton";
import useListing, { Listing } from "../hooks/useListings";

interface Props {}

const ListingGrid = ({}: Props) => {
  const { error, isLoading, data: listings } = useListing();
  const skeletons = [1, 2, 3, 4, 5, 6];

  const handleClick = (listing: Listing) => {
    console.log(listing);
  };

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
      {listings.map((listing) => (
        <ListingCardContainer key={listing._id}>
          <ListingCard listing={listing} onClick={() => handleClick(listing)} />
        </ListingCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default ListingGrid;
