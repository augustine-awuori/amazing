import { Image, ImageProps } from "@chakra-ui/react";

import ImageError from "../assets/image-error.png";

const AppImage = (props: ImageProps) => (
  <Image
    {...props}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError={(e: any) => {
      e.target.src = ImageError;
      e.target.onerror = null; // Prevent infinite loop in case the error image is also broken
    }}
  />
);

export default AppImage;
