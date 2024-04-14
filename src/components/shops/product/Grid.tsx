import { useState } from "react";
import { Box } from "@chakra-ui/react";

import { funcs } from "../../../utils";
import { Info, Grid } from "../..";
import { Modal } from "../../common";
import { paginate } from "../../../utils/paginate";
import { Product } from "../../../hooks/useProducts";
import { ProductUpdateForm } from "../../forms";
import { ProductType } from "../../../hooks/useProductTypes";
import { useCart } from "../../../hooks";
import ErrorMessage from "../../form/ErrorMessage";
import Pagination, { PaginationProps } from "../../common/Pagination";
import ProductDisplayCard from "./DisplayCard";
import Skeleton from "../product/Skeleton";

interface Props extends PaginationProps {
  error?: string;
  isLoading: boolean;
  selectedType: ProductType | null;
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
  const [product, setProduct] = useState<Product | undefined>();
  const [showProduct, setShowProduct] = useState(false);
  const cart = useCart();

  const handleEdit = (p: Product) => {
    setProduct(p);
    setShowProduct(true);
  };

  const filtered = selectedType?._id
    ? products.filter(({ shop, type }) =>
        type ? type._id === selectedType?._id : shop.types[selectedType._id]
      )
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
      <Modal
        content={
          <ProductUpdateForm
            product={product}
            onDone={() => setShowProduct(false)}
          />
        }
        isOpen={funcs.getBoolean(showProduct && product)}
        onModalClose={() => setShowProduct(false)}
      />
      <Grid columns={{ sm: 1, md: cart.count ? 3 : 4 }} spacing={5}>
        <Skeleton isLoading={isLoading} />
        {paginated.map((product, index) => (
          <ProductDisplayCard
            key={index}
            product={product}
            onEdit={() => handleEdit(product)}
          />
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
