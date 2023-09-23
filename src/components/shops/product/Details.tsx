import { Box } from "@chakra-ui/react";
import { ProductCardBtnProps } from "./CardButton";
import Button from "./CardButton";
import Text from "../../../components/Text";
import useAppColorMode from "../../../hooks/useAppColorMode";

interface Props extends ProductCardBtnProps {
  info: {
    description: string;
    name: string;
  };
}

const ProductDetails = ({
  info: { description, name },
  ...otherProps
}: Props) => {
  const { accentColor } = useAppColorMode();

  return (
    <Box py={3}>
      <Text color={accentColor} fontWeight="extrabold" fontSize="lg" mb={3}>
        {name}
      </Text>
      <Text mb={3}>{description}</Text>
      <Button {...otherProps} />
    </Box>
  );
};

export default ProductDetails;
