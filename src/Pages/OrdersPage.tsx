import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { Grid, Info, ShopsTypesGridPageContainer } from "../components";
import { MediaQueryUser } from "../components/common/MediaQuery";
import { Pagination } from "../components/common";
import { Type } from "../hooks/useTypes";
import auth from "../services/auth";
import OrderCard from "../components/order/CardWithBadge";
import useOrder, { Order } from "../hooks/useOrder";
import useOrders from "../hooks/useOrders";

const OrdersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [selectedType, setSelectedType] = useState<Type | null>(null);
  const user = auth.getCurrentUser();
  const { isLoading, orders } = useOrders(user?._id || "");
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

  if (!user) return <Navigate to="/login" />;

  return (
    <ShopsTypesGridPageContainer
      onSelectType={setSelectedType}
      selectedType={selectedType}
      gridHeadingLabel="Shops Orders"
    >
      <Grid>
        {filtered.length ? (
          filtered.map((order) => (
            <OrderCard
              key={order._id}
              count={order.products.length}
              name={order.products[0].name}
              onClick={() => navigateToDetails(order)}
              user={getUserFrom(order)}
              timestamp={order.timestamp}
            />
          ))
        ) : (
          <Info show={!isLoading} />
        )}
      </Grid>
      <Box mt={5}>
        <Pagination
          currentPage={currentPage}
          itemsCount={filtered.length}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
        />
      </Box>
    </ShopsTypesGridPageContainer>
  );
};

export default OrdersPage;