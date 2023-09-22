import { useState } from "react";
import { Box } from "@chakra-ui/react";

import { CardContainer, CardSkeleton } from "../card";
import { paginate } from "../../utils/paginate";
import { Shop } from "../../hooks/useShop";
import { Type } from "../../hooks/useTypes";
import ErrorMessage from "../form/ErrorMessage";
import Grid from "../grid";
import Heading from "../../components/Heading";
import Pagination from "../common/Pagination";
import ShopCard from "./Card";

interface Props {
  error: string | undefined;
  isLoading: boolean;
  onShopClick: (shop: Shop) => void;
  selectedType: Type | null;
  shops: Shop[];
}

const ShopsGrid = ({
  error,
  isLoading,
  onShopClick,
  selectedType,
  shops,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const skeletons = [1, 2, 3, 4, 5, 6];

  const filtered = selectedType?._id
    ? shops.filter((shop) => shop.type._id === selectedType?._id)
    : shops;

  const paginated = paginate<Shop>(filtered, currentPage, pageSize);

  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      <Grid>
        {isLoading &&
          skeletons.map((skeleton) => (
            <CardContainer key={skeleton}>
              <CardSkeleton />
            </CardContainer>
          ))}
        {paginated.length ? (
          paginated.map((shop) => (
            <CardContainer key={shop._id}>
              <ShopCard shop={shop} onClick={() => onShopClick(shop)} />
            </CardContainer>
          ))
        ) : (
          <Heading>{isLoading ? "" : "Shops not found!"}</Heading>
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

export default ShopsGrid;
