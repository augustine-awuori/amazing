import { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Spinner,
  Table,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { BsWhatsapp } from "react-icons/bs";
import { CalendarIcon, ChevronRightIcon } from "@chakra-ui/icons";

import { Avatar, Pagination, Thead } from "../components/common";
import { ChatIcon, LocationIcon } from "../components/icons";
import { format, funcs } from "../utils";
import { Grid, Image, Text } from "../components";
import { Order } from "../hooks/useOrder";
import {
  useAppColorMode,
  useData,
  useNoGrid,
  useTimestamp,
  useWhatsAppRedirect,
} from "../hooks";
import { paginate } from "../utils/paginate";
import { Product } from "../components/shops/product/Card";

const headings = ["Product", "Price", "Quantity", "Total"];

const ShopOrderPage = () => {
  const { data, isLoading } = useData(`orders/single/${useParams().orderId}`);
  const { _id, message, buyer, status, timestamp, products } =
    data as unknown as Order;
  const { tempTimestamp, getDate } = useTimestamp(timestamp);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const { accentColor } = useAppColorMode();
  const navigate = useNavigate();
  const { url } = useWhatsAppRedirect(buyer?.otherAccounts?.whatsapp);
  useNoGrid();

  const paginated = paginate<Product>(products, currentPage, pageSize);

  if (isLoading)
    return (
      <HStack pt="4.5rem">
        <Text>Fetching order ... </Text> <Spinner size="sm" />
      </HStack>
    );

  return (
    <Box pt="5rem" px={10}>
      <Flex align="center" mb={5}>
        <Text as="h1" mr={3}>
          Order Id: {_id}
        </Text>
        <CalendarIcon mr={2} />
        {getDate(timestamp)} ({tempTimestamp})
      </Flex>
      <Grid templateColumns={{ sm: "1fr", md: "65% 1fr" }}>
        <Box border="1px solid gray" borderRadius={5}>
          <Flex justify="space-between" borderBottom="1px solid gray" p={5}>
            <Text fontWeight="extrabold" fontSize={20}>
              Order in "{status.label.toLowerCase()}" status
            </Text>
            <Text fontWeight="bold" cursor="pointer" color={accentColor}>
              Update
            </Text>
          </Flex>
          <Box p={3}>
            <Table>
              <Thead headings={headings} />
              <Box my={2} />
              <Tbody>
                {paginated.map(({ image, name, price, quantity }, index) => (
                  <Tr key={index}>
                    <Td>
                      <Flex align="center">
                        <Image
                          src={image}
                          w="2.5rem"
                          h="2.5rem"
                          borderRadius={7}
                          mr={3}
                        />
                        <Text fontSize="sm">{name}</Text>
                      </Flex>
                    </Td>
                    <Td>
                      <Text>{price}</Text>
                    </Td>
                    <Td>{quantity}</Td>
                    <Td>{price}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Pagination
              currentPage={currentPage}
              itemsCount={products.length}
              mt={5}
              onPageChange={setCurrentPage}
              pageSize={pageSize}
            />
          </Box>
        </Box>
        <Box border="1px solid gray" borderRadius={5}>
          <Flex justify="space-between" borderBottom="1px solid gray" p={5}>
            <Text fontWeight="extrabold" fontSize={20}>
              Customer Profile
            </Text>
          </Flex>
          <Flex
            _hover={{ bg: "gray.700" }}
            align="center"
            borderBottom="1px solid gray"
            cursor="pointer"
            justify="space-between"
            onClick={() => navigate(`/profile/${buyer._id}`)}
            px={3}
            py={2}
          >
            <Flex>
              <Avatar
                borderRadius="full"
                mr={2}
                name={buyer.name}
                size="sm"
                src={buyer.avatar}
              />
              <Box>
                <Text fontSize="sm">{buyer.name}</Text>
                <Text color="whiteAlpha.600" fontSize="xs">
                  {buyer.username}
                </Text>
              </Box>
            </Flex>
            <ChevronRightIcon />
          </Flex>
          <Box
            _hover={{ bg: "gray.700" }}
            borderBottom="1px solid gray"
            cursor="pointer"
            onClick={() => funcs.navTo(url)}
            p={3}
          >
            <Text fontSize={18} fontWeight="bold" mb={2}>
              Contact Info
            </Text>
            <Flex align="center">
              <BsWhatsapp color="green" />
              <Text ml={2} color="whiteAlpha.600">
                {format.phoneNumber(buyer.otherAccounts.whatsapp)}
              </Text>
            </Flex>
          </Box>
          {message && (
            <Box p={3} borderBottom="1px solid gray">
              <Text fontSize={18} fontWeight="bold" mb={1}>
                Order Message
              </Text>
              <Flex align="center">
                <ChatIcon />
                <Text fontSize="sm" color="whiteAlpha.600" ml={2}>
                  {message}
                </Text>
              </Flex>
            </Box>
          )}
          <Box p={3}>
            <Text fontSize={18} fontWeight="bold" mb={1}>
              Delivery Address
            </Text>
            <Flex align="center">
              <LocationIcon />
              <Text fontSize="sm" color="whiteAlpha.600" ml={2}>
                Not specified
              </Text>
            </Flex>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default ShopOrderPage;
