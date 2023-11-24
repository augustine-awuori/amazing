import { Box } from "@chakra-ui/react";

import { CardContainer, CardSkeletons } from "../card";
import { paginate } from "../../utils/paginate";
import { Shop } from "../../hooks/useShop";
import { Type } from "../../hooks/useTypes";
import ErrorMessage from "../form/ErrorMessage";
import Grid from "../grid";
import Info from "../../components/Info";
import Pagination, { PaginationProps } from "../common/Pagination";
import ShopCard from "./Card";

interface Props extends PaginationProps {
  error: string | undefined;
  isLoading: boolean;
  onShopClick: (shop: Shop) => void;
  selectedType: Type | null;
  shops: Shop[];
  query?: string;
}

const ShopsGrid = ({
  currentPage,
  error,
  isLoading,
  onPageChange,
  onShopClick,
  pageSize,
  selectedType,
  shops,
  query,
}: Props) => {
  const filtered = selectedType?._id
    ? shops.filter((shop) => shop.type._id === selectedType._id)
    : shops;

  const queried = query
    ? filtered.filter((shop) =>
        shop.name.toLowerCase().includes(query.toLowerCase())
      )
    : filtered;

  const paginated = paginate<Shop>(queried, currentPage, pageSize);

  if (error) return <ErrorMessage error={error} />;

  if (!paginated.length && !isLoading) return <Info show={!isLoading} />;

  return (
    <>
      <Grid>
        <CardSkeletons isLoading={isLoading} />
        {paginated.map((shop) => (
          <CardContainer key={shop._id}>
            <ShopCard shop={shop} onClick={() => onShopClick(shop)} />
          </CardContainer>
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

export default ShopsGrid;
