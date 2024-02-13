import { Box } from "@chakra-ui/react";

import Skeleton from "../product/Skeleton";
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
  selectedType: Type | null;
  products: Product[];
  query?: string;
}

const ShopsProductsGrid = ({
  currentPage,
  error,
  isLoading,
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

  if (!paginated.length && !isLoading)
    return (
      <Box w="100%" h="100%">
        <Info />
      </Box>
    );

  return (
    <>
      <Grid columns={{ sm: 1, md: 3 }}>
        <Skeleton isLoading={isLoading} />
        {paginated.map((product, index) => (
          <ProductDisplayCard key={product._id + index} product={product} />
        ))}
      </Grid>
      <Box mt={5}>
        <Pagination
          currentPage={currentPage}
          itemsCount={queried.length}
          onPageChange={onPageChange}
          pageSize={pageSize}
        />
      </Box>
    </>
  );
};

export default ShopsProductsGrid;
