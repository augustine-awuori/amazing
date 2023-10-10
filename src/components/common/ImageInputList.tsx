import { ChangeEvent, useState } from "react";
import { Box, FormControl, Flex, Image } from "@chakra-ui/react";

import ImagePicker from "./ImagePicker";
import useImages from "../../hooks/useImages";

interface Props {
  imagesLimit: number;
}

const ImageInputList = ({ imagesLimit }: Props) => {
  const { addImages, imagesCount, removeImage } = useImages(imagesLimit);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const addNewFiles = (oldItems: string[], newItems: string[]) =>
    [...oldItems, ...newItems].slice(0, imagesLimit);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;

    if (files) {
      const newSelectedFiles = Array.from(files);
      addImages(newSelectedFiles);

      const newPreviews = newSelectedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(addNewFiles(imagePreviews, newPreviews));
    }
  };

  const unSelectImageBy = (imageIndex: number) => {
    removeImage(imageIndex);

    setImagePreviews(
      imagePreviews.filter((preview, index) => {
        if (index !== imageIndex) return preview;
      })
    );
  };

  return (
    <Box maxWidth="400px" mb={2} mr={2}>
      <FormControl>
        <Flex>
          <ImagePicker
            onChange={handleFileChange}
            visible={imagesCount < imagesLimit}
          />
          <Flex>
            {imagePreviews.map((preview, index) => (
              <Image
                key={index}
                src={preview}
                alt={`Selected Image ${index + 1}`}
                boxSize="100px"
                objectFit="cover"
                margin="0 10px"
                borderRadius="md"
                cursor="pointer"
                mr={2}
                onClick={() => unSelectImageBy(index)}
              />
            ))}
          </Flex>
        </Flex>
      </FormControl>
    </Box>
  );
};

export default ImageInputList;
