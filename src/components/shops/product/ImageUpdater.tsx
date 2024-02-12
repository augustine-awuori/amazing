import { useState } from "react";
import { ApiResponse } from "apisauce";
import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import { BiSave } from "react-icons/bi";
import { toast } from "react-toastify";

import { ImageInputList } from "../../common";
import { Button, Text } from "../../";
import { useAppColorMode, useImages, useProducts } from "../../../hooks";
import { DataError } from "../../../services/client";
import { storage } from "../../../utils";
import { Product } from "./Card";

interface Props {
  product: Product;
  onDone: () => void;
}

const ImageUpdater = ({ onDone, product }: Props) => {
  const { accentColor, concAccentColor } = useAppColorMode();
  const { images } = useImages(1);
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState("");
  const helper = useProducts(undefined);

  const updateImage = async (): Promise<ApiResponse<unknown, unknown>> => {
    setSaving(true);
    setProgress("Saving image");
    const newImageUrl = await storage.saveImage(images[0]);

    setProgress("Updating product image");
    const res = await helper.updateProductImage(product._id, newImageUrl);

    setProgress("Deleting unused image");
    storage.deleteImage(res.ok ? product.image : newImageUrl);
    setSaving(false);

    return res;
  };

  const saveUpdatedImage = async () => {
    if (!images[0]) return toast.info("Please select an image");

    const res = await updateImage();

    res.ok
      ? toast.success("Image updated successfully!")
      : toast.error(
          (res.data as DataError).error || "Product image isn't updated"
        );

    onDone();
  };

  return (
    <>
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
      <Text>{product.name}</Text>
      <Button
        _hover={{ backgroundColor: concAccentColor }}
        backgroundColor={accentColor}
        color="white"
        disabled={images[0] ? false : true}
        letterSpacing="1px"
        mt={2}
        onClick={saveUpdatedImage}
        rightIcon={<BiSave />}
        w="100%"
      >
        Save Image
      </Button>
    </>
  );
};

export default ImageUpdater;
