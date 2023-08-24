import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Category } from "../hooks/useCategories";
import GridPageContainer from "../components/GridPageContainer";
import ListingGrid from "../components/ListingGrid";
import useListing, { Listing } from "../hooks/useListing";

const ListingsPage = () => {
  const navigate = useNavigate();
  const { setListing } = useListing();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const navigateToDetails = (listing: Listing) => {
    setListing(listing);
    navigate(`/listings/${listing._id}`);
  };

  return (
    <GridPageContainer
      selectedCategory={selectedCategory}
      onSelectCategory={setSelectedCategory}
    >
      <ListingGrid
        onListingClick={navigateToDetails}
        selectedCategory={selectedCategory}
      />
    </GridPageContainer>
  );
};

export default ListingsPage;
