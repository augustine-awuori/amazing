import { useEffect, useState } from "react";
import { Box, Flex, Spinner, Table, Tbody, Td } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { BsWhatsapp } from "react-icons/bs";
import { CalendarIcon } from "@chakra-ui/icons";

import { BadgesList, Pagination, Thead } from "../components/common";
import { ChatIcon, LocationIcon } from "../components/icons";
import { empty, format, funcs } from "../utils";
import { Grid, Text } from "../components";
import { paginate } from "../utils/paginate";
import { ProductDisplay, Profile } from "../components/order";
import {
  useData,
  useNoGrid,
  useOrders,
  useTimestamp,
  useWhatsAppRedirect,
} from "../hooks";
import notificationsService from "../services/notifications";
import Tr from "../components/common/table/Tr";
import useOrder, { Order, OrderedProduct } from "../hooks/useOrder";
import useStatus, { Status } from "../hooks/useStatus";

const headings = ["Product", "Quantity", "Total"];

const ShopOrderPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [orderedProducts, setOrderedProducts] = useState<OrderedProduct[]>([]);
  const [pageSize] = useState(4);
  const { data, isLoading } = useData(`orders/single/${useParams().orderId}`);
  const { _id, message, buyer, status, timestamp, products, shop } =
    data as unknown as Order;
  const [selectedStatus, setSelectedStatus] = useState<Status>(
    status || empty.status
  );
  const [validStatus, setValidStatus] = useState<Status[]>([]);
  const { status: allStatus } = useStatus();
  const { tempTimestamp, getDate } = useTimestamp(timestamp);
  const { url } = useWhatsAppRedirect(buyer?.otherAccounts?.whatsapp);
  const { getOrderedProducts, getOrderedProductsGrandTotal } = useOrder();
  const navigate = useNavigate();
  const helper = useOrders();
  useNoGrid();

  useEffect(() => {
    if (products) setOrderedProducts(getOrderedProducts(products));
    setValidStatus(getValidOrderStatus());
    setSelectedStatus(status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products?.length, selectedStatus?._id, status?._id]);

  const getValidOrderStatus = (): Status[] =>
    allStatus.filter((s) => s._id) as Status[];

  const handleStatusSelect = async (status: Status) => {
    const prevStatus = selectedStatus;

    setSelectedStatus(status);
    const { ok } = await helper.updateOrder(_id, { status: status._id });
    if (!ok) return setSelectedStatus(prevStatus);

    notificationsService.create({
      description: `Your order has been ${status.label}`,
      title: `${shop.name} from Amazing App`,
      to: buyer._id,
    });
  };

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

  return (
    <Box pt="5rem" px={10}>
      <Flex align="center" mb={5}>
        <CalendarIcon mr={2} />
        <Text noOfLines={1}>
          {getDate(timestamp)} ({tempTimestamp})
        </Text>
      </Flex>
      <Text>Info Tip: Tap on Status to change the order status</Text>
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
              color={selectedStatus?.color}
            >
              Order in "{selectedStatus?.label?.toLowerCase()}" status
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
              Grand Total: {getOrderedProductsGrandTotal(orderedProducts)}
            </Text>
          </Box>
        </Box>
        <Box border="1px solid gray" borderRadius={5}>
          <Flex borderBottom="1px solid gray" p={5}>
            <Text fontWeight="extrabold" fontSize={20}>
              Customer Profile
            </Text>
          </Flex>
          <Profile
            onClick={() => navigate(`/profile/${buyer._id}`)}
            image={buyer.avatar}
            title={buyer.name}
            subTitle={buyer.username}
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
