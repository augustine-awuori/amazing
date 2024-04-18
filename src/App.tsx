import { useEffect, useState } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";

import { NavBar, Routes } from "./components";
import { CartProducts } from "./contexts/CartContext";
import { User } from "./hooks/useUser";
import auth from "./services/auth";
import ColumnContext from "./contexts/ColumnContext";

function App() {
  const [user, setUser] = useState<User | null>();
  const [column, setColumn] = useState("220px");
  const [cartProducts, setCartProducts] = useState<CartProducts>({
    count: 0,
    ids: {},
  });

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
        templateColumns="100%"
      >
        <GridItem area="nav">
          <NavBar user={user} cartCount={cartProducts.count} />
        </GridItem>
        <Box pt="4rem">
          <Routes
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
          />
        </Box>
      </Grid>
    </ColumnContext.Provider>
  );
}

export default App;
