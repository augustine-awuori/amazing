import { Grid, GridItem, HStack } from "@chakra-ui/react";

import NavBar from "../components/NavBar";
import ColorSwitchMode from "../components/ColorSwitchMode";

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
        <HStack justifyContent="space-between" marginTop={3}>
          <div></div>
          <ColorSwitchMode />
        </HStack>
      </GridItem>
    </Grid>
  );
};

export default ListingsPage;
