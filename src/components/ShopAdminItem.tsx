import { Flex } from "@chakra-ui/react";
import { GoLocation } from "react-icons/go";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { AdminItem, Avatar, Text, UserAdminItem } from "./";
import { Shop } from "../hooks/useShop";

const ShopAdminItem = ({ shop }: { shop: Shop }) => {
  return (
    <AdminItem>
      <Flex align="center" mb={2} px={2} pt={3}>
        <Avatar src={shop.image} name={shop.name} size="sm" />
        <Text ml={2} textTransform="capitalize">
          {shop.name} Shop
        </Text>
      </Flex>
      <Flex px={3}>
        <Text>Shop Type:_</Text>
        <Text color="orange.400">
          {/* {`  ${shop.type.label}`} */}
          <ChevronDownIcon />
        </Text>
      </Flex>
      {shop.location && (
        <Flex align="center" mt={3} px={3} color="green.400">
          <GoLocation /> <Text ml={1}>{shop.location}</Text>
        </Flex>
      )}
      <UserAdminItem user={shop.author} />
    </AdminItem>
  );
};

export default ShopAdminItem;
