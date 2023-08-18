import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, HStack } from "@chakra-ui/react";

import { Category } from "../hooks/useCategories";
import CategoryList from "../components/CategoryList";
import CategorySelector from "../components/CategorySelector";
import ColorSwitchMode from "../components/ColorSwitchMode";
import ListingGrid from "../components/ListingGrid";
import ListingHeading from "../components/ListingHeading";
import PageContainer from "../components/PageContainer";
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

  const Aside = (
    <Box display={{ base: "none", lg: "block" }}>
      <CategoryList
        selectedCategory={selectedCategory}
        onSelectedCategory={setSelectedCategory}
      />
    </Box>
  );

  return (
    <PageContainer Aside={Aside}>
      <>
        <Box marginY={1} paddingLeft={2}>
          <Box display={{ md: "none", lg: "block" }}>
            <ListingHeading selectedCategory={selectedCategory} />
          </Box>
          <HStack justifyContent="space-between" marginTop={3}>
            <Box display={{ lg: "none" }}>
              <CategorySelector
                onSelectCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
              />
            </Box>
            <ColorSwitchMode />
          </HStack>
        </Box>
        <ListingGrid
          onListingClick={navigateToDetails}
          selectedCategory={selectedCategory}
        />
      </>
    </PageContainer>
  );
};

export default ListingsPage;
