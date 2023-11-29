import { Box, Image } from "@chakra-ui/react";

import { Button, Text } from "../../../components";
import figure from "../../../utils/figure";
import useAppColorMode from "../../../hooks/useAppColorMode";

interface Props {
  info: {
    description: string;
    name: string;
    image: string;
    price: number;
  };
}

const ProductDetails = ({
  info: { description, name, image, price },
}: Props) => {
  const { accentColor, concAccentColor } = useAppColorMode();

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
      <Button
        _hover={{ backgroundColor: concAccentColor }}
        backgroundColor={accentColor}
        letterSpacing="1px"
        w="100%"
      >
        Ksh {figure.addComma(price)}
      </Button>
    </Box>
  );
};

export default ProductDetails;
