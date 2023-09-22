import { Badge } from "@chakra-ui/react";
import { AiOutlineShopping } from "react-icons/ai";

import { useAppColorMode } from "../../hooks";
import Button from "../../components/Button";

export interface ProductCardBtnFuncs {
  onQuantityDecrease: (id: string) => void;
  onQuantityIncrease: (id: string) => void;
}

interface ProductCardBtnProps extends ProductCardBtnFuncs {
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

  if (quantity)
    return (
      <>
        <Button onClick={() => onQuantityDecrease(productId)}>-</Button>
        <Badge
          bgColor={accentColor}
          borderRadius={5}
          fontSize="sm"
          px={4}
          py={2}
        >
          {quantity}
        </Badge>
        <Button onClick={() => onQuantityIncrease(productId)}>+</Button>
      </>
    );

  return (
    <Button
      w="100%"
      _hover={{ bgColor: accentColor }}
      onClick={() => onQuantityIncrease(productId)}
    >
      Add to Bag <AiOutlineShopping />
    </Button>
  );
};

export default ProductCardButton;
