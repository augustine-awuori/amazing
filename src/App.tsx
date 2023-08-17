import { Grid, GridItem } from "@chakra-ui/react";

import NavBar from "./components/NavBar";
import AppRoutes from "./components/Routes";

function App() {
  return (
    <Grid
      templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "aside main"` }}
      templateColumns={{ base: "1fr", lg: "150px 1fr" }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <AppRoutes />
    </Grid>
  );
}

export default App;
