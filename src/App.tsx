import { useEffect, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";

import { NavBar, Routes } from "./components";
import { User } from "./hooks/useUser";
import auth from "./services/auth";

function App() {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);

  return (
    <Grid
      templateAreas={{
        base: `"nav""main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{ base: "100%", lg: "150px 1fr" }}
    >
      <GridItem area="nav">
        <NavBar user={user} />
      </GridItem>
      <Routes />
    </Grid>
  );
}

export default App;
