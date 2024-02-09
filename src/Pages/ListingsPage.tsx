import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Category } from "../hooks/useCategories";
import {
  ListingCategoriesGridPageContainer as GridPageContainer,
  ListingGrid,
  NewItemButton as NewListingButton,
  Text,
} from "../components";
import { endpoint } from "../services/listings";
import { useAppColorMode, useListings } from "../hooks";
import useListing, { Listing } from "../hooks/useListing";

const ListingsPage = () => {
  const navigate = useNavigate();
  const { setListing } = useListing();
  const { data, error, isLoading } = useListings();
  const { accentColor } = useAppColorMode();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const navigateToDetails = (listing: Listing) => {
    setListing(listing);
    navigate(`${endpoint}/${listing._id}`);
  };

  const MoreInfo = (
    <Text
      mb={3}
      fontSize={20}
      onClick={() => navigate("/requests")}
      cursor="pointer"
      color={accentColor}
    >
      Tap to see what others are still looking for, you might just have it...
    </Text>
  );

  return (
    <GridPageContainer
      selectedCategory={selectedCategory}
      onSelectCategory={setSelectedCategory}
      gridHeadingLabel="Listings (furnitures, gas cylinders and others)"
      MoreInfo={MoreInfo}
    >
      <NewListingButton pageUrl="/listings" />
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
