import { AiOutlineShoppingCart } from "react-icons/ai";
import { Box, IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import Text from "../Text";
import useAppColorMode from "../../hooks/useAppColorMode";

const Cart = ({ cartCount }: { cartCount: number }) => {
  const { accentColor } = useAppColorMode();
  const navigate = useNavigate();

  if (!cartCount) return null;

  return (
    <Box pos="relative" onClick={() => navigate("/shops/shopping-cart")}>
      <IconButton
        aria-label="button"
        borderRadius={20}
        color={accentColor}
        icon={<AiOutlineShoppingCart />}
        mr={4}
        size="sm"
      />
      <Text cursor="pointer" fontSize="2xs" pos="absolute" top={0} right={4}>
        {cartCount}
      </Text>
    </Box>
  );
};

export default Cart;
