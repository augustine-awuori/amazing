import { Avatar, Box, Flex, Tbody as AppTbody, Td, Tr } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Text } from "..";
import { useTimestamp } from "../../hooks";
import useOrder, { Order } from "../../hooks/useOrder";

interface Props {
  orders: Order[];
}

const Tbody = ({ orders }: Props) => {
  const { getDate } = useTimestamp();
  const helper = useOrder();
  const navigate = useNavigate();

  const navigateToDetails = (order: Order) => {
    helper.setOrder(order);
    navigate(`my-orders/${order._id}`);
  };

  return (
    <AppTbody>
      {orders.map((order, index) => {
        const { products, shop, status, timestamp } = order;

        return (
          <Tr
            _hover={{ bg: "gray.900" }}
            cursor="pointer"
            onClick={() => navigateToDetails(order)}
            key={index}
          >
            <Td>
              <Flex align="center">
                <Avatar src={shop.image} name={shop.name} size="xs" mr={2} />
                <Text noOfLines={1} fontSize="sm">
                  {shop.name}
                </Text>
                {shop.location && <Text>{shop.location}</Text>}
              </Flex>
            </Td>
            <Td>{products.length}</Td>
            <Td>
              <Box
                bg={`${status.color}.100`}
                p={1.5}
                color={`${status.color}.500`}
                fontWeight="bold"
                borderRadius={15}
              >
                <Text textAlign="center" fontSize="sm">
                  {status.label}
                </Text>
              </Box>
            </Td>
            <Td>{getDate(timestamp)}</Td>
          </Tr>
        );
      })}
    </AppTbody>
  );
};

export default Tbody;
