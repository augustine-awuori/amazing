import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";

import { Category } from "../hooks/useCategories";
import { Listing } from "../hooks/useListing";
import { paginate } from "../utilities/paginate";
import CardContainer from "./CardContainer";
import CardSkeleton from "./CardSkeleton";
import Grid from "./Grid";
import ListingCard from "./ListingCard";
import Pagination from "./common/Pagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(2);
  const skeletons = [1, 2, 3, 4, 5, 6];

  const filtered = selectedCategory?._id
    ? listings.filter(
        (listing) => listing.category._id === selectedCategory?._id
      )
    : listings;

  const paginated: Listing[] = paginate(filtered, currentPage, pageSize);

  if (error) return <Text>{error}</Text>;

  return (
    <>
      <Grid>
        {isLoading &&
          skeletons.map((skeleton) => (
            <CardContainer key={skeleton}>
              <CardSkeleton />
            </CardContainer>
          ))}
        {paginated.map((listing) => (
          <CardContainer key={listing._id}>
            <ListingCard
              listing={listing}
              onClick={() => onListingClick(listing)}
            />
          </CardContainer>
        ))}
      </Grid>
      <Box mt={5}>
        <Pagination
          currentPage={currentPage}
          itemsCount={listings.length}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
        />
      </Box>
    </>
  );
};

export default ListingGrid;
