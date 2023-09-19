import { Box, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";

import { useAppColorMode } from "../../hooks";
import Button, { ProductCardBtnFuncs } from "./ProductCardButton";

export interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Props extends ProductCardBtnFuncs {
  data: Product;
}

const ProductCard: React.FC<Props> = ({
  data: { _id, image, name, price, quantity },
  onQuantityDecrease,
  onQuantityIncrease,
}: Props) => {
  const { accentColor } = useAppColorMode();
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      cursor="pointer"
      overflow="hidden"
      position="relative"
    >
      <Image src={image} alt={name} />
      <Box p="4">
        <Text fontWeight="bold" fontSize="lg">
          {name}
        </Text>
        <Text color={accentColor} fontSize="md" mt={2}>
          Ksh {price}
        </Text>
      </Box>
      <Flex
        justify="space-around"
        align="center"
        p="4"
        bg={bgColor}
        pos="absolute"
        bottom={0}
        w="100%"
        opacity={0}
        transition="opacity 0.3s"
        _hover={{ opacity: 0.9 }}
      >
        <Button
          productId={_id}
          onQuantityDecrease={onQuantityDecrease}
          onQuantityIncrease={onQuantityIncrease}
          quantity={quantity}
        />
      </Flex>
    </Box>
  );
};

export default ProductCard;
