import { Box, HStack, Heading, Button, Badge } from "@chakra-ui/react";
import { AiOutlineShopping, AiFillPlusCircle } from "react-icons/ai";

import useCurrentUser from "../../hooks/useCurrentUser";

interface Props {
  authorId: string | undefined;
  bagCount: number;
  onAddProduct: () => void;
  onBagView: () => void;
  productsCount: number;
  shopName: string | undefined;
}

const ShopPageHeader = ({
  authorId,
  bagCount,
  onAddProduct,
  onBagView,
  productsCount,
  shopName,
}: Props) => {
  const isTheAuthor = useCurrentUser(authorId);

  return (
    <HStack justifyContent="space-between" alignItems="center">
      <Heading as="h1" mb={4} size="md">
        {shopName} ({productsCount})
      </Heading>
      <Box>
        {isTheAuthor ? (
          <Button rightIcon={<AiFillPlusCircle />} onClick={onAddProduct}>
            Add Product
          </Button>
        ) : (
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
        )}
      </Box>
    </HStack>
  );
};

export default ShopPageHeader;