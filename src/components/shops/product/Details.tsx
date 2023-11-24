import { Box, Image } from "@chakra-ui/react";

import Text from "../../../components/Text";
import useAppColorMode from "../../../hooks/useAppColorMode";

interface Props {
  info: {
    description: string;
    name: string;
    image: string;
  };
}

const ProductDetails = ({ info: { description, name, image } }: Props) => {
  const { accentColor } = useAppColorMode();

  return (
    <Box py={3}>
      <Image
        borderRadius="5px"
        h="100%"
        mb={2}
        objectFit="contain"
        src={image}
      />
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
    </Box>
  );
};

export default ProductDetails;
