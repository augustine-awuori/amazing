import { useState } from "react";
import { Navigate } from "react-router-dom";

import { DismissableInfo, Pagination } from "../components/common";
import { Grid, Heading, PageContainer } from "../components";
import { paginate } from "../utils/paginate";
import { Product } from "../components/shops/product/Card";
import OrderProductCard from "../components/order/ProductCard";
import useOrder from "../hooks/useOrder";

const OrderPage = () => {
  const { order } = useOrder();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const products = order?.products || [];

  const paginated = paginate<Product>(products, currentPage, pageSize);

  if (!order) return <Navigate to="/notifications" />;

  return (
    <PageContainer>
      <DismissableInfo info={order.message} />
      <Heading mb={3}>
        Products Ordered on {new Date(order?.timestamp).toLocaleDateString()}
      </Heading>
      <Grid>
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
    </PageContainer>
  );
};

export default OrderPage;
