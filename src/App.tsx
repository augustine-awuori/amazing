import { useEffect, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";

import { NavBar, Routes } from "./components";
import { User } from "./hooks/useUser";
import auth from "./services/auth";
import LayoutContext from "./contexts/LayoutContext";

function App() {
  const [user, setUser] = useState<User | null>();
  const [baseColumn, setBaseColumn] = useState("1fr");

  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);

  return (
    <LayoutContext.Provider value={{ baseColumn, setBaseColumn }}>
      <Grid
        templateAreas={{
          base: `"nav""main"`,
          lg: `"nav nav" "aside main"`,
        }}
        templateColumns={{ base: baseColumn, lg: "150px 1fr" }}
      >
        <GridItem area="nav">
          <NavBar user={user} />
        </GridItem>
        <Routes />
      </Grid>
    </LayoutContext.Provider>
  );
}

export default App;
