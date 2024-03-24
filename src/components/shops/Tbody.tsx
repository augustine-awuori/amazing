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
    navigate(order._id);
  };

  return (
    <AppTbody>
      {orders.map((order, index) => {
        const { buyer, products, status, timestamp } = order;
        const { avatar, name, username } = buyer;

        return (
          <Tr
            _hover={{ bg: "gray.900" }}
            cursor="pointer"
            onClick={() => navigateToDetails(order)}
            key={index}
          >
            <Td>
              <Flex align="center">
                <Avatar src={avatar} name={name} size="sm" mr={2} />
                <Box>
                  <Text noOfLines={1} fontSize="sm" textTransform="capitalize">
                    {name}
                  </Text>
                  <Flex align="center">
                    <Text color="whiteAlpha.500" fontSize="xs" ml={1}>
                      {username}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </Td>
            <Td>{products.length}</Td>
            <Td>
              <Box
                bg={`${status.color}.100`}
                px={1.5}
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
