import { Box, HStack, Badge, useBreakpointValue } from "@chakra-ui/react";
import {
  AiOutlineShopping,
  AiFillPlusCircle,
  AiFillSetting,
} from "react-icons/ai";

import { Button, Heading } from "../../components";
import { useCurrentUser, useShop } from "../../hooks";

interface Props {
  bagCount: number;
  onAddProduct: () => void;
  onBagView: () => void;
  onShowSettings: () => void;
  productsCount: number;
  shopName: string | undefined;
}

const ShopPageHeader = ({
  bagCount,
  onAddProduct,
  onBagView,
  onShowSettings,
  productsCount,
  shopName,
}: Props) => {
  const { shop } = useShop();
  const isTheAuthor = useCurrentUser(shop?.author._id);
  const showIconsOnly = useBreakpointValue({ base: true, md: false });

  return (
    <HStack justifyContent="space-between" alignItems="center">
      <Heading as="h1" mb={4} size="md">
        {shopName} {showIconsOnly ? null : "Products"} ({productsCount})
      </Heading>
      <Box>
        {isTheAuthor ? (
          <>
            <Button
              rightIcon={<AiFillSetting />}
              onClick={onShowSettings}
              mr={3}
              pl={showIconsOnly ? 1.5 : undefined}
            >
              {showIconsOnly ? null : "Settings"}
            </Button>
            <Button
              rightIcon={<AiFillPlusCircle />}
              onClick={onAddProduct}
              pl={showIconsOnly ? 1.5 : undefined}
            >
              {showIconsOnly ? null : "Add Product"}
            </Button>
          </>
        ) : (
          <Button
            isLoading={false}
            leftIcon={<AiOutlineShopping />}
            mx={3}
            onClick={onBagView}
            px={2}
            textAlign="center"
          >
            {showIconsOnly ? null : "My Bag"}
            <Badge rounded={50} ml={1} pl={1.5} py={0.5}>
              {bagCount}
            </Badge>
          </Button>
        )}
      </Box>
    </HStack>
  );
};

export default ShopPageHeader;
