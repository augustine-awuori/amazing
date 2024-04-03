import { Flex } from "@chakra-ui/react";

import { Image, Text } from "..";

interface Props {
  image: string;
  name: string;
}

const ProductDisplay = ({ image, name }: Props) => (
  <Flex align="center">
    <Image src={image} w="2.5rem" h="2.5rem" borderRadius={7} mr={3} />
    <Text fontSize="sm" noOfLines={1}>
      {name}
    </Text>
  </Flex>
);

export default ProductDisplay;
