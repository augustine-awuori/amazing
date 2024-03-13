import { useState } from "react";
import { Box, Flex, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AiFillEdit, AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import {
  BiLinkExternal,
  BiCartAdd,
  BiHomeAlt2,
  BiImageAdd,
} from "react-icons/bi";

import { Button, Image, Modal, Text } from "../../../components";
import { empty, figure } from "../../../utils";
import { Product } from "./Card";
import { useAppColorMode, useCart, useCurrentUser } from "../../../hooks";
import auth from "../../../services/auth";
import ImageUpdater from "./ImageUpdater";
import ProductDetails from "./Details";

interface Props {
  product: Product;
  onEdit?: () => void;
}

const DisplayCard = ({ product, onEdit }: Props) => {
  const { _id, image, price, name, shop } = product || empty.product;
  const { accentColor } = useAppColorMode();
  const [isAddingImage, setAddingImage] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const navigate = useNavigate();
  const cart = useCart();
  const userIsTheSeller = useCurrentUser(shop.author);
  const userIsAdmin = auth.getCurrentUser()?.isAdmin;
  const userIsAuthorised = userIsTheSeller || userIsAdmin;
  const isBigScreen = useBreakpointValue({ sm: false, md: true });
  const isAdded = cart.hasProduct(_id);

  const handleClick = () => (isAdded ? cart.remove(_id) : cart.add(_id));

  const viewAllProductDetails = () =>
    navigate(`/shops/${product.shop._id}/${product._id}`);

  const ComputedButton = userIsAuthorised ? (
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
      display={{ sm: "block", md: "none" }}
      leftIcon={isAdded ? <AiOutlineCheck /> : <AiOutlinePlus />}
      mt={2}
      onClick={handleClick}
      size="sm"
      w="100%"
    >
      {isAdded ? "Added" : "Add"}
    </Button>
  );

  const Modals = () => (
    <>
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
        primaryBtnLabel="View Product"
        secondaryBtnLabel="View Shop"
        onPrimaryClick={viewAllProductDetails}
        PrimaryLeftIcon={<BiLinkExternal />}
        SecondaryLeftIcon={<BiHomeAlt2 />}
        onSecondaryClick={() => navigate(`/shops/${product.shop._id}`)}
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
    </>
  );

  return (
    <Flex cursor="pointer" display={{ base: "flex", md: "block" }}>
      <Modals />
      <Box
        _hover={{
          width: { sm: "62%", md: "100%" },
          borderRadius: ".4rem",
          transform: "scale(1.05)",
          transition: "ease .3s",
        }}
        display="block"
        pos="relative"
        mx={1.5}
        position="relative"
        w="100%"
      >
        {isBigScreen && !userIsAuthorised && (
          <IconButton
            _hover={{ color: "whiteAlpha.900" }}
            aria-label="Add"
            boxShadow="1px 1px 1px #ccc"
            bg={isAdded ? accentColor : "gray.300"}
            borderRadius="full"
            color="whiteAlpha"
            icon={isAdded ? <BsCartCheck /> : <BiCartAdd />}
            onClick={handleClick}
            pos="absolute"
            right={2}
            top={1.5}
          />
        )}
        <Image
          onClick={() => setShowProductDetails(true)}
          borderRadius=".4rem"
          h={{ base: "8rem", md: "10.5rem" }}
          mr={{ base: 3, md: 5 }}
          objectFit="cover"
          src={image}
          transition="all 0.3s"
          w="100%"
        />
        <Box
          onClick={() => setShowProductDetails(true)}
          bg="gray.300"
          borderBottomRadius=".3rem"
          bottom={0}
          display={{ base: "none", md: "block" }}
          left={0}
          position="absolute"
          textAlign="center"
          w="100%"
        >
          <Text
            fontSize="1rem"
            fontWeight="bold"
            letterSpacing="1px"
            noOfLines={1}
            textTransform="capitalize"
          >
            {name}
          </Text>
        </Box>
      </Box>
      <Box
        pt={1}
        display="block"
        w="100%"
        mx={1.5}
        onClick={() => setShowProductDetails(true)}
      >
        <Text
          display={{ sm: "block", md: "none" }}
          fontSize="1.25rem"
          fontWeight="extrabold"
          letterSpacing="1px"
          noOfLines={{ base: 2, md: 1 }}
          textTransform="capitalize"
        >
          {name}
        </Text>
        <Text
          _hover={{ fontWeight: "extrabold" }}
          color={accentColor}
          noOfLines={1}
          textAlign={{ base: "left", md: "center" }}
        >
          Ksh {figure.addComma(price)}
        </Text>
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
