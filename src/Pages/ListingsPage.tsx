import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { Category } from "../hooks/useCategories";
import { endpoint } from "../services/listings";
import { GridPageContainer, ListingGrid } from "../components";
import { useListings } from "../hooks";
import { Pagination, ScrollToTopBtn } from "../components/common";
import useListing, { Listing } from "../hooks/useListing";

const ListingsPage = () => {
  const navigate = useNavigate();
  const { setListing } = useListing();
  const { data, error, isLoading } = useListings();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const navigateToDetails = (listing: Listing) => {
    setListing(listing);
    navigate(`${endpoint}/${listing._id}`);
  };

  return (
    <>
      <ScrollToTopBtn />
      <GridPageContainer
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        pl={10}
        pr={0}
      >
        <>
          <ListingGrid
            error={error}
            isLoading={isLoading}
            listings={data}
            onListingClick={navigateToDetails}
            selectedCategory={selectedCategory}
          />
          <Box mt={5}>
            <Pagination
              currentPage={currentPage}
              itemsCount={data.length}
              onPageChange={setCurrentPage}
              pageSize={6}
            />
          </Box>
        </>
      </GridPageContainer>
    </>
  );
};

export default ListingsPage;
