import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { DismissableInfo, Pagination } from "../components/common";
import { Grid, Heading } from "../components";
import { Order } from "../hooks/useOrder";
import { paginate } from "../utils/paginate";
import { Product } from "../components/shops/product/Card";
import { useNoGrid, useOrder, useReload } from "../hooks";
import CardSkeletons from "../components/card/Skeletons";
import empty from "../utils/empty";
import OrderProductCard from "../components/order/ProductCard";
import service from "../services/orders";

const OrderPage = () => {
  const { order: info } = useOrder();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const {
    info: order,
    isLoading,
    request,
  } = useReload<Order>(info, empty.order, service.getOrder);
  const navigate = useNavigate();
  useNoGrid();

  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const products = order.products;
  const paginated = paginate<Product>(products, currentPage, pageSize);

  if (!order._id) return <>{navigate(-1)}</>;

  return (
    <Box pt="4rem" px={5}>
      <DismissableInfo info={order.message} />
      <Heading mb={3}>
        Products Ordered on {new Date(order?.timestamp).toLocaleDateString()}
      </Heading>
      <Grid>
        <CardSkeletons isLoading={isLoading} />
        {paginated.map((product) => (
          <OrderProductCard product={product} />
        ))}
      </Grid>
      <Pagination
        currentPage={currentPage}
        itemsCount={products.length}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
      />
    </Box>
  );
};

export default OrderPage;
