import { Box, Flex, Image, Radio } from "@chakra-ui/react";
import { CheckIcon, ChevronRightIcon } from "@chakra-ui/icons";

import { Text } from "../../components";
import img from "../../assets/shop.jpg";

interface Props {
  onClick: () => void;
  selected: boolean;
}

const ShopSelector = ({ onClick, selected }: Props) => (
  <Flex
    _hover={{ bg: "gray.600" }}
    align="center"
    borderRadius={7}
    bg={selected ? "gray.600" : "inherit"}
    cursor="pointer"
    my={1.5}
    onClick={onClick}
    p={2}
    transition="all 0.3s"
  >
    {selected ? <CheckIcon mr={2} /> : <Radio size="md" mr={2} />}
    <Image
      src={img}
      w={{ base: 10, md: 8 }}
      h={{ base: 10, md: 8 }}
      borderRadius="full"
      mr={2}
    />
    <Box w="100%">
      <Text fontWeight="bold">Clike Shop</Text>
      <Text color="gray.300" lineHeight={1} fontSize=".7rem">
        Around the main campus
      </Text>
    </Box>
    <ChevronRightIcon />
  </Flex>
);

export default ShopSelector;
