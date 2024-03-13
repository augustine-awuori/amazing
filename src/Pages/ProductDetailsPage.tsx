import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider, Flex } from "@chakra-ui/react";
import { FaHandshake } from "react-icons/fa";
import { BsTruck } from "react-icons/bs";
import { FaUndo } from "react-icons/fa";

import { empty, figure } from "../utils";
import { Button, Grid, Image, Text } from "../components";
import { Product } from "../components/shops/product/Card";
import {
  useAppColorMode,
  useCart,
  useNoGrid,
  useOrders,
  useReload,
} from "../hooks";
import service from "../services/products";
import { BiHomeAlt } from "react-icons/bi";

interface InfoProps {
  description: string;
  Icon: JSX.Element;
  title: string;
}

const ProductDetailsPage = () => {
  useNoGrid();
  const cart = useCart();
  const navigate = useNavigate();
  const { accentColor, concAccentColor } = useAppColorMode();
  const orderHelper = useOrders();
  const { info: product, request } = useReload<Product>(
    null,
    empty.product,
    service.getProduct
  );

  const { _id, image, name, description, price, shop, quantity } = product;
  const isAdded = cart.hasProduct(_id);

  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Info = ({ description, Icon, title }: InfoProps) => (
    <Flex align="center" px={4} py={3}>
      {Icon}
      <Box ml={3}>
        <Text fontWeight="extrabold">{title}</Text>
        <Text>{description}</Text>
      </Box>
    </Flex>
  );

  const updateCart = () => (isAdded ? cart.remove(_id) : cart.add(_id));

  const makeOrder = async () => {
    cart.add(_id);
    await orderHelper.makeShopsOrders("");
  };

  const CartButton = (): JSX.Element => {
    if (isAdded)
      return (
        <Flex
          align="center"
          bg="gray.600"
          py={2}
          borderRadius={20}
          overflow="hidden"
          w="100%"
          justify="space-around"
        >
          <Box
            px={3}
            cursor="pointer"
            onClick={() => cart.decrementQuantity(_id)}
          >
            -
          </Box>
          <Text fontSize="md">{quantity || 1}</Text>
          <Box
            px={3}
            cursor="pointer"
            onClick={() => cart.incrementQuantity(_id)}
          >
            +
          </Box>
        </Flex>
      );

    return (
      <Button
        _hover={{ bg: accentColor }}
        bg="inherit"
        border="2px solid"
        borderColor={accentColor}
        onClick={updateCart}
        w="100%"
        borderRadius={20}
      >
        {isAdded ? "Added" : "Add"} to Cart
      </Button>
    );
  };

  return (
    <Box pt={20} px={{ lg: 10, md: 5 }} mx="auto">
      <Grid columns={{ sm: 1, md: 2 }}>
        <Image src={image} w="100%" objectFit="contain" borderRadius={7} />
        <Box>
          <Text
            fontWeight="extrabold"
            textTransform="capitalize"
            fontSize={30}
            mb={4}
          >
            {name}
          </Text>
          <Text mb={3}>{description}</Text>
          <Divider />
          <Text color={accentColor} fontSize={25}>
            Ksh {figure.addComma(price)}
          </Text>
          <Flex align="center">
            <FaHandshake />
            <Text ml={2} color="green.400" fontSize="sm">
              Negotiable
            </Text>
            <Text mx={2}>.</Text>
            <Flex
              cursor="pointer"
              align="center"
              onClick={() => navigate(`/shops/${shop._id}`)}
            >
              <BiHomeAlt />
              <Text
                _hover={{ color: concAccentColor }}
                color={accentColor}
                ml={1}
              >
                Visit shop
              </Text>
            </Flex>
          </Flex>
          <Divider mt={2} />
          <Flex py={5} w="100%" align="center" justify="space-between">
            <Button
              _hover={{ bg: concAccentColor }}
              onClick={makeOrder}
              w="100%"
              borderRadius={20}
              bg={accentColor}
            >
              Order Now
            </Button>
            <Box w={7} />
            <CartButton />
          </Flex>
          <Box border="1px solid gray" borderRadius={5} py={3}>
            <Info
              Icon={<BsTruck />}
              description={shop.location}
              title="Meet-up for delivery"
            />
            <Divider />
            <Info
              Icon={<FaUndo />}
              description="Free 30days Delivery Return"
              title="Return Delivery"
            />
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default ProductDetailsPage;
