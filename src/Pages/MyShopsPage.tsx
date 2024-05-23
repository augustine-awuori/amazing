import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { Heading, ShopsGrid, Text } from "../components";
import { useData, useUser } from "../hooks";
import useShop, { Shop } from "../hooks/useShop";

const MyShopsPage = () => {
  const user = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const { data: shops, error, isLoading } = useData<Shop>(`shops/${user?._id}`);
  const { setShop } = useShop();
  const navigate = useNavigate();

  const navigateToDetails = (shop: Shop) => {
    setShop(shop);
    navigate(shop._id);
  };

  if (!user) return <Navigate to="/" />;

  return (
    <Box pt="4.5rem" px={10}>
      <Heading as="h1" textAlign="center">
        My Shops
      </Heading>
      <Text color="whiteAlpha.500" mt={3} textAlign="center" mb={8}>
        Select shop to see the orders made to it
      </Text>
      <ShopsGrid
        currentPage={currentPage}
        error={error}
        isLoading={isLoading}
        onPageChange={setCurrentPage}
        onShopClick={navigateToDetails}
        pageSize={pageSize}
        selectedType={null}
        shops={shops}
      />
    </Box>
  );
};

export default MyShopsPage;
