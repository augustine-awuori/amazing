import { useState } from "react";
import { Badge, Box, Flex, IconButton } from "@chakra-ui/react";
import { BiMinus, BiPlus } from "react-icons/bi";

import { DeleteIcon } from "../icons";
import { figure } from "../../utils";
import { Image, Text } from "..";
import { Item } from "../common/Selector";
import { MenuContent } from "../common";
import { Product } from "../../hooks/useProducts";
import { useAppColorMode, useCart } from "../../hooks";

interface Props extends Product {
  onQuantityIncrement: (productId: string) => void;
  onQuantityDecrement: (productId: string) => void;
}

const SideCartItem = ({
  onQuantityDecrement,
  onQuantityIncrement,
  ...product
}: Props) => {
  const { accentColor } = useAppColorMode();
  const [expanded, setExpanded] = useState(false);
  const cart = useCart();

  const quantity = cart.getProductQuantity(product._id);

  const getDeleteActions = (prod: Product): Item[] => [
    {
      _id: prod._id,
      label: `Delete ${prod.name}`,
      icon: <DeleteIcon />,
    },
  ];

  return (
    <Box cursor="pointer" mb={4}>
      <Flex
        onClick={() => setExpanded(!expanded)}
        align="center"
        justify="space-between"
      >
        <Flex>
          <Image src={product.images[0]} h={9} w={9} mr={2} borderRadius={5} />
          <Box>
            <Text textTransform="capitalize" noOfLines={1} fontSize="sm">
              {product.name}
            </Text>
            <Text color={accentColor} fontSize="xs">
              Ksh {figure.addComma(product.price)}
            </Text>
          </Box>
        </Flex>
        <Box>
          <Badge>{quantity}</Badge>
        </Box>
      </Flex>
      {expanded && (
        <Flex align="center" justify="space-between" w="100%">
          <Flex w="30%" align="center" mt={1}>
            <IconButton
              aria-label="minus-icon"
              size="xs"
              icon={<BiMinus />}
              onClick={() => onQuantityDecrement(product._id)}
            />
            <Text fontSize="xs" mx={2}>
              {quantity}
            </Text>
            <IconButton
              size="xs"
              aria-label="add-icon"
              icon={<BiPlus />}
              onClick={() => onQuantityIncrement(product._id)}
            />
          </Flex>
          <MenuContent
            Button={<DeleteIcon cursor="pointer" />}
            data={getDeleteActions(product)}
            onSelectItem={({ _id }) => cart.remove(_id)}
          />
        </Flex>
      )}
    </Box>
  );
};

export default SideCartItem;
