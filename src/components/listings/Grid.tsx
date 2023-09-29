import { useState } from "react";
import { Box } from "@chakra-ui/react";

import { CardContainer, CardSkeleton } from "../card";
import { Category } from "../../hooks/useCategories";
import { Listing } from "../../hooks/useListing";
import { paginate } from "../../utils/paginate";
import ErrorMessage from "../form/ErrorMessage";
import Grid from "../grid";
import Info from "../../components/Info";
import ListingCard from "./Card";
import Pagination from "../common/Pagination";

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
  const [pageSize] = useState(6);
  const skeletons = [1, 2, 3, 4, 5, 6];

  const filtered = selectedCategory?._id
    ? listings.filter(
        (listing) => listing.category._id === selectedCategory?._id
      )
    : listings;

  const paginated = paginate<Listing>(filtered, currentPage, pageSize);

  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      <Grid>
        {isLoading &&
          skeletons.map((skeleton) => (
            <CardContainer key={skeleton}>
              <CardSkeleton />
            </CardContainer>
          ))}
        {paginated.length ? (
          paginated.map((listing) => (
            <CardContainer key={listing._id}>
              <ListingCard
                listing={listing}
                onClick={() => onListingClick(listing)}
              />
            </CardContainer>
          ))
        ) : (
          <Info show={!isLoading} />
        )}
      </Grid>
      <Box mt={5}>
        <Pagination
          currentPage={currentPage}
          itemsCount={filtered.length}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
        />
      </Box>
    </>
  );
};

export default ListingGrid;
