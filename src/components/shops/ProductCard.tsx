import { Box, Flex, Image, useColorModeValue, Icon } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons"; // Assuming you're using Chakra UI Icons library

import { useAppColorMode } from "../../hooks";
import Button, { ProductCardBtnFuncs } from "./ProductCardButton";
import figure from "../../utils/figure";
import Text from "../../components/Text";

export interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Props extends ProductCardBtnFuncs {
  data: Product;
  onEdit: () => void;
  showButton: boolean;
}

const ProductCard: React.FC<Props> = ({
  data: { _id, image, name, price, quantity },
  onEdit,
  onQuantityDecrease,
  onQuantityIncrease,
  showButton,
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
      <Box position="relative">
        <Image src={image} alt={name} w="100%" />
        {!showButton && (
          <Flex position="absolute" top={0} right={0} p="2" onClick={onEdit}>
            <Icon as={EditIcon} boxSize={6} color="white" />
          </Flex>
        )}
      </Box>
      <Box p="4">
        <Text fontWeight="bold" fontSize="lg">
          {name}
        </Text>
        <Text color={accentColor} fontSize="md" mt={2}>
          Ksh {figure.addComma(price)}
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
        _hover={showButton ? { opacity: 0.9 } : {}}
      >
        {showButton && (
          <Button
            productId={_id}
            onQuantityDecrease={onQuantityDecrease}
            onQuantityIncrease={onQuantityIncrease}
            quantity={quantity}
          />
        )}
      </Flex>
    </Box>
  );
};

export default ProductCard;
