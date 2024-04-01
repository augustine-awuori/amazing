import { useEffect, useState } from "react";
import { Box, Flex, Spinner, Table, Tbody, Td } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { BsWhatsapp } from "react-icons/bs";
import { CalendarIcon, ChevronRightIcon } from "@chakra-ui/icons";

import { Avatar, BadgesList, Pagination, Thead } from "../components/common";
import { CartProduct } from "../hooks/useCart";
import { ChatIcon, LocationIcon } from "../components/icons";
import { empty, format, funcs } from "../utils";
import { Grid, Image, Text } from "../components";
import { Order } from "../hooks/useOrder";
import { paginate } from "../utils/paginate";
import { Product } from "../hooks/useProducts";
import {
  useCart,
  useData,
  useNoGrid,
  useOrders,
  useTimestamp,
  useWhatsAppRedirect,
} from "../hooks";
import Tr from "../components/common/table/Tr";
import useStatus, { Status } from "../hooks/useStatus";

const headings = ["Product", "Quantity", "Total"];

const ShopOrderPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [orderedProducts, setOrderedProducts] = useState<CartProduct[]>([]);
  const [pageSize] = useState(4);
  const { data, isLoading } = useData(`orders/single/${useParams().orderId}`);
  const { _id, message, buyer, status, timestamp, products } =
    data as unknown as Order;
  const [selectedStatus, setSelectedStatus] = useState<Status>(
    status || empty.status
  );
  const [validStatus, setValidStatus] = useState<Status[]>([]);
  const { status: allStatus } = useStatus();
  const { tempTimestamp, getDate } = useTimestamp(timestamp);
  const { url } = useWhatsAppRedirect(buyer?.otherAccounts?.whatsapp);
  const cart = useCart();
  const navigate = useNavigate();
  const helper = useOrders();
  useNoGrid();

  useEffect(() => {
    setOrderedProducts(
      (products || []).map((p) => ({ ...p, quantity: 1, deleted: false }))
    );
    setValidStatus(getValidOrderStatus());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products?.length, selectedStatus?._id]);

  const getValidOrderStatus = (): Status[] =>
    allStatus.filter((s) => s._id) as Status[];

  const handleStatusSelect = async (status: Status) => {
    const prevStatus = selectedStatus;

    setSelectedStatus(status);
    const { ok } = await helper.updateOrder(_id, { status: status._id });
    if (!ok) setSelectedStatus(prevStatus);
  };

  const paginated = paginate<Product>(products, currentPage, pageSize);

  if (isLoading)
    return (
      <Flex align="center" justify="center" pt="4.5rem">
        <Text mr={1}>Fetching order... </Text> <Spinner size="xs" />
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
      <BadgesList
        list={validStatus}
        onItemSelect={(item) => handleStatusSelect(item as Status)}
        selectedItem={selectedStatus || status}
      />
      <Grid templateColumns={{ sm: "1fr", md: "65% 1fr" }}>
        <Box border="1px solid gray" borderRadius={5}>
          <Flex
            align="center"
            justify="space-between"
            borderBottom="1px solid gray"
            p={5}
            w="100%"
          >
            <Text
              fontWeight="extrabold"
              fontSize={20}
              color={selectedStatus.color}
            >
              Order in "{selectedStatus.label.toLowerCase()}" status
            </Text>
          </Flex>
          <Table>
            <Thead headings={headings} />
            <Tbody mt={4}>
              {paginated.map(({ _id, image, name, price }, index) => {
                const quantity = cart.getProductQuantity(_id);

                return (
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
                );
              })}
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
