import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Category } from "../hooks/useCategories";
import { empty, format } from "../utilities";
import { endpoint } from "../services/listings";
import { GridPageContainer, ListingGrid } from "../components";
import { Listing } from "../hooks/useListing";
import { useListing, useProfileListings } from "../hooks";

const ProfileListingsPage = () => {
  const navigate = useNavigate();
  const { setListing } = useListing();
  const params = useParams();
  const { error, isLoading, listings } = useProfileListings(
    params[empty.user.paramsId]
  );
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const navigateToDetails = (listing: Listing) => {
    setListing(listing);
    navigate(`${endpoint}/${listing._id}`);
  };

  return (
    <GridPageContainer
      headingPrefix={format.getFirstWord(listings?.[0]?.author?.name)}
      selectedCategory={selectedCategory}
      onSelectCategory={setSelectedCategory}
      pl={10}
      pr={0}
    >
      <ListingGrid
        error={error}
        isLoading={isLoading}
        listings={listings}
        onListingClick={navigateToDetails}
        selectedCategory={selectedCategory}
      />
    </GridPageContainer>
  );
};

export default ProfileListingsPage;
