import { Badge } from "@chakra-ui/react";
import { AiOutlineShopping } from "react-icons/ai";

import { useAppColorMode } from "../../../hooks";
import Button from "../../Button";

export interface ProductCardBtnFuncs {
  onQuantityDecrease: (id: string) => void;
  onQuantityIncrease: (id: string) => void;
}

export interface ProductCardBtnProps extends ProductCardBtnFuncs {
  productId: string;
  quantity: number;
}

const ProductCardButton = ({
  productId,
  onQuantityDecrease,
  onQuantityIncrease,
  quantity,
}: ProductCardBtnProps) => {
  const { accentColor } = useAppColorMode();

  const handleQuantityDec = () => {
    if (quantity >= 1) onQuantityDecrease(productId);
  };

  if (quantity)
    return (
      <>
        <Button onClick={handleQuantityDec}>-</Button>
        <Badge
          bgColor={accentColor}
          borderRadius={5}
          fontSize="sm"
          px={4}
          py={2}
          mx={5}
        >
          {quantity}
        </Badge>
        <Button onClick={() => onQuantityIncrease(productId)}>+</Button>
      </>
    );

  return (
    <Button
      _hover={{ bgColor: accentColor }}
      backdropBlur="md"
      onClick={() => onQuantityIncrease(productId)}
      w="100%"
    >
      Add to Bag <AiOutlineShopping />
    </Button>
  );
};

export default ProductCardButton;
