import { useState } from "react";
import { Box } from "@chakra-ui/react";

import { CardContainer, CardSkeletons } from "../../card";
import { paginate } from "../../../utils/paginate";
import { Product } from "./Card";
import { Type } from "../../../hooks/useTypes";
import ErrorMessage from "../../form/ErrorMessage";
import Grid from "../../grid";
import Info from "../../../components/Info";
import Pagination from "../../common/Pagination";
import ProductDisplayCard from "./DisplayCard";

interface Props {
  error: string | undefined;
  isLoading: boolean;
  onClick: (product: Product) => void;
  selectedType: Type | null;
  products: Product[];
}

const ShopsProductsGrid = ({
  error,
  isLoading,
  onClick,
  selectedType,
  products,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);

  const filtered = selectedType?._id
    ? products.filter((product) => product.shop.type === selectedType?._id)
    : products;

  const paginated = paginate<Product>(filtered, currentPage, pageSize);

  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      <Grid>
        <CardSkeletons isLoading={isLoading} />
        {paginated.length ? (
          paginated.map((product, index) => (
            <CardContainer key={product._id + index}>
              <ProductDisplayCard product={product} onClick={onClick} />
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
          onPageChange={setCurrentPage}
          pageSize={pageSize}
        />
      </Box>
    </>
  );
};

export default ShopsProductsGrid;
