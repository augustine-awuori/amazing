import { useEffect, useState } from "react";
import { Box, Flex, Spinner, Tbody, Td } from "@chakra-ui/react";
import { CalendarIcon, ChatIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import { BsWhatsapp } from "react-icons/bs";

import { Grid, Text } from "../components";
import { empty, format, funcs } from "../utils";
import { LocationIcon } from "../components/icons";
import { paginate } from "../utils/paginate";
import { Pagination, Thead } from "../components/common";
import { ProductDisplay, Profile } from "../components/order";
import { useData, useTimestamp, useWhatsAppRedirect } from "../hooks";
import Table from "../components/common/table/Table";
import Tr from "../components/common/table/Tr";
import useOrder, { Order, OrderedProduct } from "../hooks/useOrder";

const headings = ["Product", "Quantity", "Total"];

const MyOrderPage = () => {
  const { data, error, isLoading } = useData(
    `orders/single/${useParams().orderId}`
  );
  const order = Array.isArray(data) ? empty.order : (data as unknown as Order);
  const { getDate, tempTimestamp } = useTimestamp();
  const [orderedProducts, setOrderedProducts] = useState<OrderedProduct[]>([]);
  const { _id, buyer, message, shop, status, timestamp, products } =
    data as unknown as Order;
  const seller = order?.shop?.author;
  const sellerWhatsApp = seller?.otherAccounts?.whatsapp;
  const { url } = useWhatsAppRedirect(sellerWhatsApp);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const navigate = useNavigate();
  const helper = useOrder();

  useEffect(() => {
    if (products) setOrderedProducts(helper.getOrderedProducts(products));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products?.length, error, Array.isArray(data)]);

  const paginated = paginate<OrderedProduct>(
    orderedProducts,
    currentPage,
    pageSize
  );

  if (isLoading)
    return (
      <Flex align="center" justify="center" pt="4.5rem">
        <Text mr={1}>Fetching order... </Text> <Spinner size="xs" />
      </Flex>
    );

  if (!_id && !orderedProducts?.length)
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
            <Tbody mt={4}>
              {paginated.map(({ images, name, price, quantity }, index) => (
                <Tr key={index}>
                  <Td>
                    <ProductDisplay image={images[0]} name={name} />
                  </Td>
                  <Td>{quantity}</Td>
                  <Td>{price * quantity}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Pagination
            currentPage={currentPage}
            itemsCount={orderedProducts.length}
            mt={5}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
          />
          <Box my={4} px={3}>
            <Text>
              Grand Total:{" "}
              {helper.getOrderedProductsGrandTotal(orderedProducts)}
            </Text>
          </Box>
        </Box>
        <Box border="1px solid gray" borderRadius={5}>
          <Flex borderBottom="1px solid gray" p={5}>
            <Text fontWeight="extrabold" fontSize={20}>
              Shop Profile
            </Text>
          </Flex>
          <Profile
            onClick={() => navigate(`/shops/${shop._id}`)}
            title={shop.name}
            subTitle={shop.location}
            image={shop.image}
          />
          <Profile
            onClick={() => navigate(`/profile/${buyer._id}`)}
            title={buyer.name}
            subTitle={buyer.username}
            image={buyer.avatar}
          />
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
              <Text ml={2} color="whiteAlpha.600" noOfLines={1}>
                {format.phoneNumber(sellerWhatsApp) || "Tap to WhatsApp Chat"}
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
              Delivery Method
            </Text>
            <Flex align="center">
              <LocationIcon />
              <Text fontSize="sm" color="whiteAlpha.600" ml={2}>
                Meet-up for delivery
              </Text>
            </Flex>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default MyOrderPage;
