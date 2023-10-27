import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { Grid, Info, ShopsTypesGridPageContainer } from "../components";
import { MediaQueryUser } from "../components/common/MediaQuery";
import { Pagination } from "../components/common";
import { Type } from "../hooks/useTypes";
import { useOrders, useShop } from "../hooks";
import auth from "../services/auth";
import OrderCard from "../components/order/CardWithBadge";
import useOrder, { Order } from "../hooks/useOrder";

const OrdersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [selectedType, setSelectedType] = useState<Type | null>(null);
  const { isLoading, orders } = useOrders(`${useParams().shopId}`);
  const { shop } = useShop();
  const helper = useOrder();
  const navigate = useNavigate();

  const getUserFrom = ({ buyer }: Order): MediaQueryUser => ({
    avatar: buyer.avatar,
    isVerified: buyer.isVerified,
    name: buyer.name,
  });

  const filtered = selectedType?._id
    ? orders.filter((order) => order.shop.type === selectedType)
    : orders;

  const navigateToDetails = (order: Order) => {
    helper.setOrder(order);
    navigate(order._id);
  };

  if (!auth.getCurrentUser()) return <Navigate to="/login" />;

  const shopName = shop?.name ? `${shop.name}'s ` : "";

  return (
    <ShopsTypesGridPageContainer
      onSelectType={setSelectedType}
      selectedType={selectedType}
      gridHeadingLabel={`${shopName}Shop Orders`}
    >
      <Grid>
        {filtered.length ? (
          filtered.map((order) => {
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
          })
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
