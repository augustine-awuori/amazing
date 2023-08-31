import { useContext } from "react";

import ImagesContext from "../contexts/ImagesContext";

const useImages = (imagesLimit: number) => {
  const context = useContext(ImagesContext);

  const images = context?.images || [];

  const getNewImages = (newImages: File[]) =>
    [...(context?.images || []), ...newImages].slice(0, imagesLimit);

  const addImages = (images: File[]) =>
    context?.setImages(getNewImages(images));

  const removeImage = (imageIndex: number) =>
    context?.setImages(
      context.images.filter((img, index) => {
        if (index !== imageIndex) return img;
      })
    );

  return { addImages, images, imagesCount: images.length, removeImage };
};

export default useImages;
