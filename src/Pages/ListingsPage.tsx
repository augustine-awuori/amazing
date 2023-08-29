import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Category } from "../hooks/useCategories";
import { endpoint } from "../services/listings";
import { GridPageContainer, ListingGrid } from "../components";
import { useListings } from "../hooks";
import useListing, { Listing } from "../hooks/useListing";

const ListingsPage = () => {
  const navigate = useNavigate();
  const { setListing } = useListing();
  const { data, error, isLoading } = useListings();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const navigateToDetails = (listing: Listing) => {
    setListing(listing);
    navigate(`${endpoint}/${listing._id}`);
  };

  return (
    <GridPageContainer
      selectedCategory={selectedCategory}
      onSelectCategory={setSelectedCategory}
    >
      <ListingGrid
        error={error}
        isLoading={isLoading}
        listings={data}
        onListingClick={navigateToDetails}
        selectedCategory={selectedCategory}
      />
    </GridPageContainer>
  );
};

export default ListingsPage;
