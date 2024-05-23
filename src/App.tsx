import { useEffect, useState } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";

import { CartProducts } from "./contexts/CartContext";
import { NavBar, Routes } from "./components";
import useUser, { User } from "./hooks/useUser";

function App() {
  const [user, setUser] = useState<User>();
  const retrievedUser = useUser();
  const [cartProducts, setCartProducts] = useState<CartProducts>({
    count: 0,
    ids: {},
  });

  useEffect(() => {
    initInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initInfo = async () => {
    setUser(retrievedUser);
  };

  return (
    <Grid
      templateAreas={{ base: `"nav""main"`, lg: `"nav nav" "aside main"` }}
      templateColumns="100%"
    >
      <GridItem area="nav">
        <NavBar user={user} cartCount={cartProducts.count} />
      </GridItem>
      <Box pt={{ base: "3.5rem", md: "2.1rem" }}>
        <Routes
          cartProducts={cartProducts}
          setCartProducts={setCartProducts}
          setUser={setUser}
          user={user}
        />
      </Box>
    </Grid>
  );
}

export default App;
