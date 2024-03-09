import { useState } from "react";
import { Box } from "@chakra-ui/react";

import { CardContainer, CardSkeletons } from "../card";
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
  searchQuery?: string;
}

const ListingGrid = ({
  error,
  isLoading,
  listings,
  onListingClick,
  selectedCategory,
  searchQuery,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);

  const filtered = selectedCategory?._id
    ? listings.filter(({ category }) => category._id === selectedCategory?._id)
    : listings;

  const queried = searchQuery
    ? filtered.filter(({ title }) =>
        title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filtered;

  const paginated = paginate<Listing>(queried, currentPage, pageSize);

  if (error) return <ErrorMessage error={error} />;

  if (!paginated.length && !isLoading)
    return (
      <Box w="100%" h="100%">
        <Info show={!isLoading} />
      </Box>
    );

  return (
    <>
      <Grid columns={{ sm: 1, md: 3 }}>
        <CardSkeletons isLoading={isLoading} />
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
          itemsCount={queried.length}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
        />
      </Box>
    </>
  );
};

export default ListingGrid;
