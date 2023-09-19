import { Box, HStack, Heading, Button, Badge } from "@chakra-ui/react";
import { AiOutlineShopping, AiFillPlusCircle } from "react-icons/ai";

interface Props {
  bagCount: number;
  onAddProduct: () => void;
  onBagView: () => void;
  productsCount: number;
  shopName: string | undefined;
}

const ShopPageHeader = ({
  bagCount,
  onAddProduct,
  onBagView,
  productsCount,
  shopName,
}: Props) => (
  <HStack justifyContent="space-between">
    <Heading as="h1" mb={4} size="xl">
      {shopName} ({productsCount})
    </Heading>
    <Box>
      <Button
        leftIcon={<AiOutlineShopping />}
        mx={3}
        onClick={onBagView}
        isLoading={false}
      >
        My Bag
        <Badge rounded={50} ml={1} px={1.5} py={0.5}>
          {bagCount}
        </Badge>
      </Button>
      {false && (
        <Button rightIcon={<AiFillPlusCircle />} onClick={onAddProduct}>
          Add Product
        </Button>
      )}
    </Box>
  </HStack>
);

export default ShopPageHeader;
