import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

import { Grid, Info, Text } from "../components";
import { MediaQueryUser } from "../components/common/MediaQuery";
import { Pagination } from "../components/common";
import { Type } from "../hooks/useTypes";
import { useAppColorMode, useOrders } from "../hooks";
import auth from "../services/auth";
import OrderCard from "../components/order/CardWithBadge";
import useOrder, { Order } from "../hooks/useOrder";

const OrdersPage = () => {
  const { accentColor } = useAppColorMode();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [selectedType] = useState<Type | null>(null);
  const user = auth.getCurrentUser();
  const { isLoading, orders } = useOrders(`${user?._id}`);
  const helper = useOrder();
  const navigate = useNavigate();

  const getUserFrom = ({ shop }: Order): MediaQueryUser => ({
    avatar: shop.image,
    isVerified: shop.isVerified,
    name: shop.name,
  });

  const filtered = selectedType?._id
    ? orders.filter((order) => order.shop.type === selectedType)
    : orders;

  const navigateToDetails = (order: Order) => {
    helper.setOrder(order);
    navigate(order._id);
  };

  if (!user)
    return (
      <Flex mt={10} align="center" justify="center">
        <Text
          cursor="pointer"
          mr={1}
          color={accentColor}
          onClick={() => navigate("/login")}
        >
          Login{" "}
        </Text>
        <Text textAlign="center"> to see your recieved and sent orders.</Text>
      </Flex>
    );

  if (!filtered.length)
    return (
      <Box h="100%" w="100%">
        <Info show={!isLoading} />
      </Box>
    );

  return (
    <>
      <Grid>
        {filtered.map((order) => {
          const { _id, products, timestamp } = order;

          return (
            <OrderCard
              key={_id}
              count={products.length}
              name={products[0].name}
              image={products[0].image}
              onClick={() => navigateToDetails(order)}
              user={getUserFrom(order)}
              timestamp={timestamp}
            />
          );
        })}
      </Grid>
      <Box mt={5}>
        <Pagination
          currentPage={currentPage}
          itemsCount={filtered.length}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
        />
      </Box>
    </>
  );
};

export default OrdersPage;
