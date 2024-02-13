import { useState } from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AiFillEdit, AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";

import { Button, Image, Modal, Text } from "../../../components";
import { empty, figure } from "../../../utils";
import { Product } from "./Card";
import {
  useAppColorMode,
  useCart,
  useCurrentUser,
  useTimestamp,
} from "../../../hooks";
import auth from "../../../services/auth";
import ImageUpdater from "./ImageUpdater";
import ProductDetails from "./Details";

interface Props {
  product: Product;
  onEdit?: () => void;
}

const DisplayCard = ({ product, onEdit }: Props) => {
  const { _id, image, price, name, shop, timestamp } = product || empty.product;
  const { accentColor } = useAppColorMode();
  const { tempTimestamp } = useTimestamp(timestamp, true);
  const [isAddingImage, setAddingImage] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const navigate = useNavigate();
  const cart = useCart();
  const isAuthorised =
    useCurrentUser(shop.author) || auth.getCurrentUser()?.isAdmin;

  const isAdded = cart.hasProduct(_id);

  const handleClick = () => (isAdded ? cart.remove(_id) : cart.add(_id));

  const ComputedButton = isAuthorised ? (
    <Flex align="center" justify="space-between" mt={2}>
      <Button
        backgroundColor={accentColor}
        borderRadius="30px"
        color="#fff"
        leftIcon={<AiFillEdit />}
        onClick={() => onEdit?.()}
        w="100%"
      >
        Edit Product
      </Button>
      <Box w={3} />
      <IconButton
        color="green.400"
        icon={<BiImageAdd />}
        borderRadius={15}
        aria-label="button"
        onClick={() => setAddingImage(true)}
      />
    </Flex>
  ) : (
    <Button
      _active={{ backgroundColor: accentColor, color: "white" }}
      _hover={{ backgroundColor: accentColor, color: "white" }}
      backgroundColor={isAdded ? accentColor : "white.100"}
      borderColor={accentColor}
      borderRadius="30px"
      borderWidth="2px"
      color={isAdded ? "white" : accentColor}
      leftIcon={isAdded ? <AiOutlineCheck /> : <AiOutlinePlus />}
      mt={2}
      onClick={handleClick}
      size="sm"
      w="100%"
    >
      {isAdded ? "Added" : "Add"}
    </Button>
  );

  return (
    <Flex
      cursor="pointer"
      display={{ base: "flex", md: "block" }}
      onClick={() => setShowProductDetails(true)}
    >
      <Modal
        title="Product Viewer"
        isOpen={showProductDetails}
        content={
          <ProductDetails
            info={product}
            onDone={() => setShowProductDetails(false)}
          />
        }
        onModalClose={() => setShowProductDetails(false)}
        primaryBtnLabel="View Shop"
        onPrimaryClick={() => navigate(`/shops/${product.shop._id}`)}
      />

      <Modal
        title="Product Image Updater"
        isOpen={isAddingImage}
        content={
          <ImageUpdater
            onDone={() => setAddingImage(false)}
            product={product}
          />
        }
        onModalClose={() => setAddingImage(false)}
      />

      <Image
        _hover={{
          width: { sm: "62%", md: "100%" },
          borderRadius: ".3rem",
          transform: "scale(1.05)",
          transition: "ease .3s",
        }}
        borderRadius=".2rem"
        h={{ base: "8rem", md: "9.5rem" }}
        mr={{ base: 3, md: 5 }}
        objectFit="cover"
        src={image}
        transition="all 0.3s"
        w={{ sm: "60%", base: "70%", md: "100%" }}
      />
      <Box py={1} display="block" w="100%" mx={1.5}>
        <Text
          fontSize="1.25rem"
          fontWeight="extrabold"
          letterSpacing="1px"
          noOfLines={{ base: 2, md: 1 }}
          textTransform="capitalize"
        >
          {name}
        </Text>
        <Flex justify="space-between">
          <Text color={accentColor} noOfLines={1}>
            Ksh {figure.addComma(price)}
          </Text>
          <Text color="gray.400" fontSize="sm">
            {tempTimestamp}
          </Text>
        </Flex>
        <Text
          _hover={{ color: "whiteAlpha.700" }}
          color="gray.500"
          display={{ sm: "block", md: "none" }}
          noOfLines={1}
          textTransform="capitalize"
          transition="color 0.3s"
        >
          {shop.name} Shop
        </Text>
        {ComputedButton}
      </Box>
    </Flex>
  );
};

export default DisplayCard;
