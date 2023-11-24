import { Box } from "@chakra-ui/react";
import Text from "../../../components/Text";
import useAppColorMode from "../../../hooks/useAppColorMode";

interface Props {
  info: {
    description: string;
    name: string;
  };
}

const ProductDetails = ({ info: { description, name } }: Props) => {
  const { accentColor } = useAppColorMode();

  return (
    <Box py={3}>
      <Text color={accentColor} fontWeight="extrabold" fontSize="lg" mb={3}>
        {name}
      </Text>
      <Text mb={3}>{description || "Product has no description"}</Text>
    </Box>
  );
};

export default ProductDetails;
