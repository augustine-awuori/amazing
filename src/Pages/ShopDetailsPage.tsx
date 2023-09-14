import { Heading } from "@chakra-ui/react";
import { PageContainer } from "../components";
import useShop from "../hooks/useShop";

const ShopDetailsPage = () => {
  const { shop } = useShop();
  console.log(shop);
  return (
    <PageContainer>
      <Heading>Your products will be displayed here</Heading>
    </PageContainer>
  );
};

export default ShopDetailsPage;
