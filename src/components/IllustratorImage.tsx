import { Image, ImageProps } from "@chakra-ui/react";

const IllustratorImage = (props: ImageProps) => (
  <Image
    {...props}
    h={{ base: "70%", lg: "40%" }}
    ml={{ base: "15%", md: "30%", lg: "25%" }}
    mt={{ base: "10%", md: "0", lg: "1%" }}
    objectFit="contain"
    w={{ base: "70%", md: "40%", lg: "40%" }}
  />
);

export default IllustratorImage;
