import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { empty } from "../utils";
import { Grid, ShopsTypesGridPageContainer } from "../components";
import { MediaQueryUser } from "../components/common/MediaQuery";
import { Pagination } from "../components/common";
import { Product } from "../components/shops/product/Card";
import { Type } from "../hooks/useTypes";
import OrderCard from "../components/order/CardWithBadge";
import useOrder, { Order } from "../hooks/useOrder";
import pic from "../assets/pic.jpg";

const product: Product = {
  name: "iPhone 14 Collection",
  _id: "",
  description: "",
  image: pic,
  price: 250,
  quantity: 0,
};

const orders: Order[] = [
  {
    _id: "1",
    products: [product, product, product],
    shop: empty.shop,
    timestamp: 503384,
  },
  {
    _id: "2",
    products: [product, product],
    shop: empty.shop,
    timestamp: 503384,
  },
  {
    _id: "3",
    products: [product, product, product, product],
    shop: empty.shop,
    timestamp: 503384,
  },
  { _id: "4", products: [product], shop: empty.shop, timestamp: 503384 },
];

const OrdersPage = () => {
  const [selectedType, setSelectedType] = useState<Type | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const navigate = useNavigate();
  const helper = useOrder();

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

  return (
    <ShopsTypesGridPageContainer
      onSelectType={setSelectedType}
      selectedType={selectedType}
      gridHeadingLabel="Shop Orders"
    >
      <Grid>
        {filtered.map((order) => (
          <OrderCard
            key={order._id}
            count={order.products.length}
            name={order.products[0].name}
            onClick={() => navigateToDetails(order)}
            user={getUserFrom(order)}
            timestamp={order.timestamp}
          />
        ))}
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
