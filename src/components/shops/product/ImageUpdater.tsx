import { useState } from "react";
import { ApiResponse } from "apisauce";
import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import { BiSave } from "react-icons/bi";
import { toast } from "react-toastify";

import { Button, Text } from "../../";
import { DataError } from "../../../services/client";
import { ImageInputList } from "../../common";
import { Product } from "../../../hooks/useProducts";
import { useAppColorMode, useImages } from "../../../hooks";
import service from "../../../services/products";
import storage from "../../../db/image";

interface Props {
  product: Product;
  onDone: () => void;
}

const MAX_IMAGES_INPUT_COUNT = 3;

const ImageUpdater = ({ onDone, product }: Props) => {
  const { accentColor, concAccentColor } = useAppColorMode();
  const { images } = useImages(MAX_IMAGES_INPUT_COUNT);
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState("");

  const prepImages = (): string[] => {
    const imgs: string[] = [];

    Promise.all([
      images.map(async (image) => {
        const result = await storage.saveImage(image);
        imgs.push(result);

        return result;
      }),
    ]);

    return imgs;
  };

  const updateImage = async (): Promise<ApiResponse<unknown, unknown>> => {
    setSaving(true);
    setProgress("Saving image");
    const newImagesUrl = prepImages();

    setProgress("Updating product image");
    const res = await service.update({ images: newImagesUrl }, product._id);

    setProgress("Deleting unused image");
    await storage.deleteImages(res.ok ? product.images : newImagesUrl);
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
        <Text textAlign="center">
          The selected images will replace the existing. If none is selected,
          the previous images will persist
        </Text>
        <ImageInputList imagesLimit={MAX_IMAGES_INPUT_COUNT} />
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
