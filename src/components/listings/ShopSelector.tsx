import { Box, Flex, Image, Radio } from "@chakra-ui/react";
import { CheckIcon, ChevronRightIcon } from "@chakra-ui/icons";

import { Text } from "../../components";
import { Shop } from "../../hooks/useShop";

interface Props {
  onClick: () => void;
  selected: boolean;
  shop: Shop;
}

const ShopSelector = ({ onClick, selected, shop }: Props) => (
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
      src={shop.image}
      w={{ base: 10, md: 8 }}
      h={{ base: 10, md: 8 }}
      borderRadius="full"
      mr={2}
    />
    <Box w="100%">
      <Text fontWeight="bold" noOfLines={2}>
        {shop.name}
      </Text>
      {shop.location && (
        <Text color="gray.300" lineHeight={1} fontSize=".7rem">
          {shop.location}
        </Text>
      )}
    </Box>
    <ChevronRightIcon />
  </Flex>
);

export default ShopSelector;
