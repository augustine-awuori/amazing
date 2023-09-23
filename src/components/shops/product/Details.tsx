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
    <Box>
      <Text color={accentColor} fontWeight="extrabold" fontSize="md" mb={1}>
        {name}
      </Text>
      <Text>{description}</Text>
      <Button {...otherProps} />
    </Box>
  );
};

export default ProductDetails;
