import { useState } from "react";
import { Box, Grid, GridItem, HStack } from "@chakra-ui/react";

import { Category } from "../hooks/useCategories";
import CategoryList from "../components/CategoryList";
import CategorySelector from "../components/CategorySelector";
import ColorSwitchMode from "../components/ColorSwitchMode";
import ListingGrid from "../components/ListingGrid";
import ListingHeading from "../components/ListingHeading";
import NavBar from "../components/NavBar";

const ListingsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  return (
    <Grid
      templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "aside main"` }}
      templateColumns={{ base: "1fr", lg: "150px 1fr" }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <GridItem area="aside" paddingX={5} marginTop={2}>
        <Box display={{ base: "none", lg: "block" }}>
          <CategoryList
            selectedCategory={selectedCategory}
            onSelectedCategory={setSelectedCategory}
          />
        </Box>
      </GridItem>
      <GridItem area="main" paddingX={5}>
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
        <ListingGrid selectedCategory={selectedCategory} />
      </GridItem>
    </Grid>
  );
};

export default ListingsPage;
