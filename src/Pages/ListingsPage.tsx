import { Grid, GridItem } from "@chakra-ui/react";

import NavBar from "../components/NavBar";

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
      <GridItem area="main"></GridItem>
    </Grid>
  );
};

export default ListingsPage;
