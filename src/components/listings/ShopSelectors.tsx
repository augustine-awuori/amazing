import { useState } from "react";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { AiOutlineWarning } from "react-icons/ai";

import { SearchInput, Text } from "../../components";
import { ShopSelector } from ".";
import { Shop } from "../../hooks/useShop";
import { useShops } from "../../hooks";
import auth from "../../services/auth";

interface Props {
  onShopSelect: (shopId: string) => void;
  selectedShop: string;
}

const ShopSelectors = ({ onShopSelect, selectedShop }: Props) => {
  const { shops: allShops, isLoading } = useShops();
  const [query, setQuery] = useState("");

  const user = auth.getCurrentUser();

  const shops: Shop[] = user?.isAdmin
    ? allShops
    : allShops.filter((s) => s.author._id === user?._id);

  const filtered: Shop[] = query
    ? shops.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
    : shops;

  if (isLoading)
    return (
      <Flex align="center" justify="center">
        <Spinner size="sm" />
        <Text ml={3} textAlign="center">
          Fetching shops...
        </Text>
      </Flex>
    );

  if (!filtered.length)
    return (
      <Flex align="center" justify="center">
        <AiOutlineWarning />
        <Text ml={1} textAlign="center" color="yellow.300">
          Shops not found!
        </Text>
      </Flex>
    );

  return (
    <Box>
      <SearchInput
        onTextChange={setQuery}
        placeholder="Search Shop"
        value={query}
      />
      <Box maxH="250px" overflowY="scroll" px={2} scrollBehavior="smooth">
        {filtered.map(({ _id }, index) => (
          <ShopSelector
            key={index}
            onClick={() => onShopSelect(_id)}
            selected={selectedShop === _id}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ShopSelectors;
