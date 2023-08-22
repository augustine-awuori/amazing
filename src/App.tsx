import { useEffect, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";

import AppRoutes from "./components/Routes";
import auth from "./services/auth";
import NavBar from "./components/NavBar";
import { User } from "./hooks/useUser";

function App() {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);

  return (
    <Grid
      templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "aside main"` }}
      templateColumns={{ base: "1fr", lg: "150px 1fr" }}
    >
      <GridItem area="nav">
        <NavBar user={user} />
      </GridItem>
      <AppRoutes />
    </Grid>
  );
}

export default App;
