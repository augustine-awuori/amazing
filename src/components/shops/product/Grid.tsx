import { Box } from "@chakra-ui/react";

import { CardContainer, CardSkeletons } from "../../card";
import { paginate } from "../../../utils/paginate";
import { Product } from "./Card";
import { Type } from "../../../hooks/useTypes";
import ErrorMessage from "../../form/ErrorMessage";
import Grid from "../../grid";
import Info from "../../../components/Info";
import Pagination, { PaginationProps } from "../../common/Pagination";
import ProductDisplayCard from "./DisplayCard";

interface Props extends PaginationProps {
  error: string | undefined;
  isLoading: boolean;
  onClick: (shopId: string) => void;
  selectedType: Type | null;
  products: Product[];
  query?: string;
}

const ShopsProductsGrid = ({
  currentPage,
  error,
  isLoading,
  onClick,
  onPageChange,
  pageSize,
  products,
  query,
  selectedType,
}: Props) => {
  const filtered = selectedType?._id
    ? products.filter((product) => product.shop.type === selectedType?._id)
    : products;

  const queried = query
    ? filtered.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    : filtered;

  const paginated = paginate<Product>(queried, currentPage, pageSize);

  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      <Grid>
        <CardSkeletons isLoading={isLoading} />
        {paginated.length ? (
          paginated.map((product, index) => (
            <CardContainer key={product._id + index}>
              <ProductDisplayCard
                product={product}
                onClick={() => onClick(product.shop._id)}
              />
            </CardContainer>
          ))
        ) : (
          <Info show={!isLoading} />
        )}
      </Grid>
      <Box mt={5}>
        <Pagination
          currentPage={currentPage}
          itemsCount={filtered.length}
          onPageChange={onPageChange}
          pageSize={pageSize}
        />
      </Box>
    </>
  );
};

export default ShopsProductsGrid;
