import { useEffect, useState } from "react";
import { Box, Flex, Spinner, Tbody, Td } from "@chakra-ui/react";
import { CalendarIcon, ChatIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import { BsWhatsapp } from "react-icons/bs";

import { Avatar, Grid, Image, Text } from "../components";
import { CartProduct } from "../hooks/useCart";
import { Order } from "../hooks/useOrder";
import { useCart, useData, useTimestamp, useWhatsAppRedirect } from "../hooks";
import { empty, format, funcs } from "../utils";
import { LocationIcon } from "../components/icons";
import { Pagination, Thead } from "../components/common";
import { Product } from "../components/shops/product/Card";
import { paginate } from "../utils/paginate";
import Table from "../components/common/table/Table";
import Tr from "../components/common/table/Tr";

const headings = ["Product", "Quantity", "Total"];

const MyOrderPage = () => {
  const { data, error, isLoading } = useData(
    `orders/single/${useParams().orderId}`
  );
  const order = Array.isArray(data) ? empty.order : (data as unknown as Order);
  const { getDate, tempTimestamp } = useTimestamp();
  const [orderedProducts, setOrderedProducts] = useState<CartProduct[]>([]);
  const { _id, message, shop, status, timestamp, products } =
    data as unknown as Order;
  const seller = order?.shop?.author;
  const sellerWhatsApp = seller?.otherAccounts?.whatsapp;
  const { url } = useWhatsAppRedirect(sellerWhatsApp);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const cart = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setOrderedProducts(
      (products || []).map((p) => ({ ...p, quantity: 1, deleted: false }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products?.length, error, Array.isArray(data)]);

  const paginated = paginate<Product>(products, currentPage, pageSize);

  if (isLoading)
    return (
      <Flex align="center" justify="center" pt="4.5rem">
        <Text mr={1}>Fetching order... </Text> <Spinner size="xs" />
      </Flex>
    );

  if (!_id)
    return (
      <Flex pt="8rem" align="center" justify="center">
        <Text color="yellow.200">
          Error Fetching Order, Check your internet connection
        </Text>
      </Flex>
    );

  return (
    <Box pt="5rem" px={10}>
      <Flex align="center" mb={5}>
        <CalendarIcon mr={2} />
        <Text noOfLines={1}>
          {getDate(timestamp)} ({tempTimestamp})
        </Text>
      </Flex>
      <Grid templateColumns={{ sm: "1fr", md: "65% 1fr" }}>
        <Box border="1px solid gray" borderRadius={5}>
          <Flex
            align="center"
            justify="space-between"
            borderBottom="1px solid gray"
            p={5}
            w="100%"
          >
            <Text fontWeight="extrabold" fontSize={20} color={status.color}>
              Order in "{status.label.toLowerCase()}" status
            </Text>
          </Flex>
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
                      <Text fontSize="sm" noOfLines={1}>
                        {name}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>{quantity || 1}</Td>
                  <Td>{price * (quantity || 1)}</Td>
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
          <Box mt={4} px={3}>
            <Text>
              Grand Total: {cart.getProductsGrandTotal(orderedProducts)}
            </Text>
          </Box>
        </Box>
        <Box border="1px solid gray" borderRadius={5}>
          <Flex borderBottom="1px solid gray" p={5}>
            <Text fontWeight="extrabold" fontSize={20}>
              Shop Profile
            </Text>
          </Flex>
          <Flex
            _hover={{ bg: "gray.700" }}
            align="center"
            borderBottom="1px solid gray"
            cursor="pointer"
            justify="space-between"
            onClick={() => navigate(`/shops/${shop._id}`)}
            px={3}
            py={2}
          >
            <Flex>
              <Avatar
                borderRadius="full"
                mr={2}
                name={shop.name}
                size="sm"
                src={shop.image}
              />
              <Box>
                <Text fontSize="sm">{shop.name}</Text>
                <Text color="whiteAlpha.600" fontSize="xs">
                  {shop.location}
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
                {format.phoneNumber(sellerWhatsApp) || "WhatsApp Chat"}
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

export default MyOrderPage;
