import { Grid, GridItem } from "@chakra-ui/react";

import ListingsPage from "./Pages/ListingsPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Grid
      templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "aside main"` }}
      templateColumns={{ base: "1fr", lg: "150px 1fr" }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <ListingsPage />
    </Grid>
  );
}

export default App;
