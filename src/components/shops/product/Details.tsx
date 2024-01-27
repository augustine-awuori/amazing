import { useState } from "react";
import { toast } from "react-toastify";
import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import { BiImageAdd, BiSave } from "react-icons/bi";

import { Button, Image, Text } from "../../../components";
import { figure, storage } from "../../../utils";
import { ImageInputList } from "../../../components/common";
import { Product } from "./Card";
import {
  useImages,
  useAppColorMode,
  useProducts,
  useCurrentUser,
} from "../../../hooks";
import auth from "../../../services/auth";

interface Props {
  info: Product;
  onDone: () => void;
}

const ProductDetails = ({
  info: { _id, shop, description, name, image, price },
  onDone,
}: Props) => {
  const { accentColor, concAccentColor } = useAppColorMode();
  const { images, removeAllImages } = useImages(1);
  const [isAddingImage, setAddingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState("");
  const helper = useProducts(undefined);
  const isTheOwner = useCurrentUser(shop.author);
  const currentUserIsAdmin = auth.getCurrentUser()?.isAdmin;

  const dismissOperations = () => {
    removeAllImages();
    setAddingImage(false);
    setProgress("");
    onDone();
  };

  const updateImage = async (): Promise<boolean> => {
    setSaving(true);
    setProgress("Saving image");
    const newImageUrl = await storage.saveImage(images[0]);

    setProgress("Updating product image");
    const { ok } = await helper.updateProductImage(_id, newImageUrl);

    setProgress("Deleting unused image");
    storage.deleteImage(ok ? image : newImageUrl);
    setSaving(false);

    return ok;
  };

  const saveAddedImage = async () => {
    if (!images[0]) return toast.info("Please select an image");

    (await updateImage())
      ? toast.success("Image updated successfully!")
      : toast.error("Product image isn't updated");

    dismissOperations();
  };

  return (
    <Box py={3}>
      {isAddingImage ? (
        <Box position="relative">
          <ImageInputList imagesLimit={1} />
          {saving && (
            <Center
              borderRadius={10}
              position="absolute"
              top="0"
              left="0"
              bottom="0"
              right="0"
              backdropFilter="blur(4px)"
              backgroundColor="rgba(255, 255, 255, 0.1)"
            >
              <Flex direction="column" align="center" justify="center">
                <Spinner size="md" />
                <Text mt={2}>{progress}...</Text>
              </Flex>
            </Center>
          )}
        </Box>
      ) : (
        <Image
          borderRadius="5px"
          h="100%"
          mb={2}
          objectFit="contain"
          src={image}
        />
      )}
      <Text
        color={accentColor}
        fontSize="lg"
        fontWeight="extrabold"
        mb={3}
        textTransform="capitalize"
      >
        {name}
      </Text>
      <Text mb={3}>{description || "Product has no description"}</Text>
      {!isAddingImage && (
        <>
          <Button
            _hover={{ backgroundColor: concAccentColor }}
            backgroundColor={accentColor}
            color="white"
            letterSpacing="1px"
            w="100%"
          >
            Ksh {figure.addComma(price)}
          </Button>
          {(isTheOwner || currentUserIsAdmin) && (
            <Button
              color="white"
              colorScheme="green"
              mt={2}
              onClick={() => setAddingImage(true)}
              rightIcon={<BiImageAdd />}
              w="100%"
            >
              Add Image
            </Button>
          )}
        </>
      )}
      {isAddingImage && (
        <Button
          _hover={{ backgroundColor: concAccentColor }}
          backgroundColor={accentColor}
          color="white"
          disabled={images[0] ? false : true}
          letterSpacing="1px"
          mt={2}
          onClick={saveAddedImage}
          rightIcon={<BiSave />}
          w="100%"
        >
          Save Image
        </Button>
      )}
    </Box>
  );
};

export default ProductDetails;
