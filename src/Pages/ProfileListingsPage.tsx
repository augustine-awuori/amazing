import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Category } from "../hooks/useCategories";
import { endpoint } from "../services/listings";
import { Listing } from "../hooks/useListing";
import { useListing, useProfileListings } from "../hooks";
import empty from "../utilities/empty";
import GridPageContainer from "../components/GridPageContainer";
import ListingGrid from "../components/ListingGrid";
import manipulator from "../utilities/stringManipulator";

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
      headingPrefix={manipulator.getFirstWord(listings?.[0]?.author?.name)}
      selectedCategory={selectedCategory}
      onSelectCategory={setSelectedCategory}
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
