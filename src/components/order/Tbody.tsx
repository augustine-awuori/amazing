import { Avatar, Box, Flex, Tbody as AppTbody, Td } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { LocationIcon } from "../icons";
import { Text } from "..";
import { useTimestamp } from "../../hooks";
import Tr from "../common/table/Tr";
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
        const { image, name } = shop;
        const location = shop.location;

        return (
          <Tr onClick={() => navigateToDetails(order)} key={index}>
            <Td>
              <Flex align="center">
                <Avatar
                  src={image}
                  name={name}
                  size={location ? "sm" : "xs"}
                  mr={2}
                />
                <Box>
                  <Text noOfLines={1} fontSize="sm" textTransform="capitalize">
                    {name}
                  </Text>
                  {location && (
                    <Flex align="center">
                      <LocationIcon size={10} color="whiteAlpha.500" />
                      <Text color="whiteAlpha.500" fontSize="xs" ml={1}>
                        {location}
                      </Text>
                    </Flex>
                  )}
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
