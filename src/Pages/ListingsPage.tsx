import { Box, Grid, GridItem } from "@chakra-ui/react";

import ColorSwitchMode from "../components/ColorSwitchMode";
import NavBar from "../components/NavBar";
import ListingGrid from "../components/ListingGrid";

const ListingsPage = () => {
  return (
    <Grid
      templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "aside main"` }}
      templateColumns={{ base: "1fr", lg: "200px 1fr" }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <GridItem area="aside"></GridItem>
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
