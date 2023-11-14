import { useEffect, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";

import { NavBar, Routes } from "./components";
import { User } from "./hooks/useUser";
import auth from "./services/auth";
import ColumnContext from "./contexts/ColumnContext";

function App() {
  const [user, setUser] = useState<User | null>();
  const [column, setColumn] = useState("170px");

  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);

  return (
    <ColumnContext.Provider value={{ column, setColumn }}>
      <Grid
        templateAreas={{
          base: `"nav""main"`,
          lg: `"nav nav" "aside main"`,
        }}
        templateColumns={{ base: "100%", lg: `${column} 1fr` }}
      >
        <GridItem area="nav">
          <NavBar user={user} />
        </GridItem>
        <Routes />
      </Grid>
    </ColumnContext.Provider>
  );
}

export default App;
