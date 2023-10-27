import { Box, Divider, HStack, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { Info, PageContainer, Text } from "../components";
import { useData, useTimestamp } from "../hooks";
import { Order } from "../hooks/useOrder";
import ShopsProductsGrid from "../components/shops/product/Grid";
import UserAvatar from "../components/common/MediaQuery";

const ShopOrderPage = () => {
  const { data, error, isLoading } = useData(
    `orders/single/${useParams().orderId}`
  );
  const { message, buyer, timestamp, products } = data as unknown as Order;
  const { tempTimestamp } = useTimestamp(timestamp);

  return (
    <PageContainer>
      <Info show={error} />
      {isLoading ? (
        <HStack>
          <Text>Fetching order ... </Text> <Spinner size="sm" />
        </HStack>
      ) : (
        <>
          <Box mb={5}>
            <UserAvatar user={buyer} time={tempTimestamp} />
            <Divider my={3} />
            <Info fontSize="1xl" show>{`Message: "${message}"`}</Info>
          </Box>
          <Text>Ordered Products</Text>
          <ShopsProductsGrid
            error=""
            isLoading={isLoading}
            onClick={() => {}}
            products={products || []}
            selectedType={null}
          />
        </>
      )}
    </PageContainer>
  );
};

export default ShopOrderPage;
