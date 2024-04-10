import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider, Flex, SkeletonText } from "@chakra-ui/react";
import { FaHandshake } from "react-icons/fa";
import { BsTruck } from "react-icons/bs";
import { FaUndo } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";

import { empty, figure } from "../utils";
import { Button, Grid, Image, Text } from "../components";
import { DeleteIcon } from "../components/icons";
import { MenuContent } from "../components/common";
import { Product } from "../hooks/useProducts";
import {
  useAppColorMode,
  useCart,
  useCurrentUser,
  useNoGrid,
  useOrders,
  useProducts,
  useReload,
} from "../hooks";
import auth from "../services/auth";
import service from "../services/products";

interface InfoProps {
  description: string;
  Icon: JSX.Element;
  title: string;
}

const deleteActions = [
  {
    _id: "",
    label: "Delete Product Permanently?",
    icon: <DeleteIcon />,
  },
];

const ProductDetailsPage = () => {
  useNoGrid();
  const cart = useCart();
  const navigate = useNavigate();
  const { accentColor, concAccentColor } = useAppColorMode();
  const orderHelper = useOrders();
  const {
    info: product,
    request,
    isLoading,
  } = useReload<Product>(null, empty.product, service.getProduct);
  const isSeller = useCurrentUser(product.shop?.author);
  const { deleteProductById } = useProducts();
  const [selectedImage, setSelectedImage] = useState(
    product?.images?.[0] || ""
  );

  useEffect(() => {
    request();
    if (!selectedImage) setSelectedImage(product?.images?.[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.images?.length]);

  if (!product._id && !isLoading)
    return (
      <Box pt="7rem">
        <Text textAlign="center">Network Error!</Text>
        <Text color={accentColor} onClick={request}>
          Retry
        </Text>
      </Box>
    );

  const { _id, images, name, description, price, shop } = product;
  const quantity = cart.getProductQuantity(_id);
  const isAdded = cart.hasProduct(_id);

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

  const visitShop = () => navigate(`/shops/${shop._id}`);

  const deleteProduct = async () => {
    const { ok } = await deleteProductById(_id);
    if (ok) visitShop();
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
    <Box pt="4rem">
      <Grid columns={{ sm: 1, md: 2 }} mx="auto">
        <Box>
          <Image
            px={{ base: 3 }}
            src={selectedImage}
            w="100%"
            objectFit="contain"
            borderRadius={{ md: 7, base: 10 }}
          />
          <Flex m={5}>
            {(images || []).map((image) => (
              <Image
                border={selectedImage === image ? "2px solid orange" : "none"}
                borderRadius={10}
                cursor="pointer"
                h={20}
                key={image}
                mr={3}
                objectFit="cover"
                onClick={() => setSelectedImage(image)}
                src={image}
              />
            ))}
          </Flex>
        </Box>
        <Box px={{ base: 5 }}>
          {isLoading && !name ? (
            <SkeletonText mb={1.5} />
          ) : (
            <Text
              fontWeight="extrabold"
              textTransform="capitalize"
              fontSize={30}
              mb={4}
            >
              {name}
            </Text>
          )}
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
            <Text mx={2} mb={2}>
              .
            </Text>
            <Flex cursor="pointer" align="center" onClick={visitShop}>
              <BiHomeAlt />
              <Text
                _hover={{ color: concAccentColor }}
                color={accentColor}
                fontSize="sm"
                noOfLines={1}
                ml={1}
              >
                Visit shop by {product.author?.name}
              </Text>
            </Flex>
          </Flex>
          <Divider mt={2} />
          {isSeller || auth.getCurrentUser()?.isAdmin ? (
            <MenuContent
              Button={
                <Button
                  my={5}
                  w="100%"
                  borderRadius={20}
                  bg="red.300"
                  _hover={{ bg: "red.600" }}
                >
                  Delete Product
                </Button>
              }
              data={deleteActions}
              buttonWidth="100%"
              onSelectItem={deleteProduct}
            />
          ) : (
            <>
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
            </>
          )}
          <Box border="1px solid gray" borderRadius={5} py={3}>
            <Info
              Icon={<BsTruck />}
              description={shop?.location || ""}
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
