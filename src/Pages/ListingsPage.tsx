import { useState } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";

import { Category } from "../hooks/useCategories";
import CategoryList from "../components/CategoryList";
import ColorSwitchMode from "../components/ColorSwitchMode";
import ListingGrid from "../components/ListingGrid";
import NavBar from "../components/NavBar";

const ListingsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  return (
    <Grid
      templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "aside main"` }}
      templateColumns={{ base: "1fr", lg: "200px 1fr" }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <GridItem area="aside" paddingX={5} marginTop={2}>
        <CategoryList
          selectedCategory={selectedCategory}
          onSelectedCategory={setSelectedCategory}
        />
      </GridItem>
      <GridItem area="main" paddingX={5}>
        <Box marginY={1} paddingLeft={2}>
          <ColorSwitchMode />
        </Box>
        <ListingGrid />
      </GridItem>
    </Grid>
  );
};

export default ListingsPage;
