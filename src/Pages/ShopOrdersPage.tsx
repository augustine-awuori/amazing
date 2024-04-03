import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Box, Flex, Spinner, Tbody, Td } from "@chakra-ui/react";

import { BadgesList, Pagination, Thead } from "../components/common";
import { empty } from "../utils";
import { Heading, Text } from "../components";
import { paginate } from "../utils/paginate";
import { Status } from "../hooks/useStatus";
import { MediaQuery, StatusBadge } from "../components/order";
import { useNoGrid, useOrders, useStatus, useTimestamp } from "../hooks";
import auth from "../services/auth";
import Table from "../components/common/table/Table";
import Tr from "../components/common/table/Tr";
import useOrder, { Order } from "../hooks/useOrder";

const OrdersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [selectedStatus, setSelectedStatus] = useState<Status>(empty.status);
  const { ordersLoading, orders } = useOrders(useParams().shopId);
  const { status, isLoading: statusLoading } = useStatus();
  const { getDate } = useTimestamp();
  const navigate = useNavigate();
  const helper = useOrder();
  useNoGrid();

  const handleStatusSelect = (status: Status) => {
    setCurrentPage(1);
    setSelectedStatus(status);
  };

  const navigateToDetails = (order: Order) => {
    helper.setOrder(order);
    navigate(order._id);
  };

  const filtered = selectedStatus._id
    ? orders.filter(({ status }) => status._id === selectedStatus._id)
    : orders;

  const paginated = paginate<Order>(filtered, currentPage, pageSize);

  const filterMessage = selectedStatus._id
    ? `"${selectedStatus.label.toLowerCase()}"`
    : "";

  if (!auth.getCurrentUser()) return <Navigate to="/login" />;

  return (
    <Box pt="4.5rem" px={10}>
      <Flex align="center" justify="center">
        <Heading as="h1" textAlign="center" mr={2}>
          My Shop Orders
        </Heading>
        {ordersLoading && <Spinner size="xs" />}
      </Flex>
      <Text color="whiteAlpha.500" mt={3} textAlign="center" mb={8}>
        The orders others placed to my shop
      </Text>
      <BadgesList
        list={status}
        loading={statusLoading}
        onItemSelect={(status) => handleStatusSelect(status as Status)}
        selectedItem={selectedStatus}
      />
      {paginated.length ? (
        <Table mt={3}>
          <Thead
            headings={["Customer", "Products", "Status", "Ordered Date"]}
          />
          <Tbody>
            {paginated.map((order) => (
              <Tr key={order._id} onClick={() => navigateToDetails(order)}>
                <Td>
                  <MediaQuery
                    image={order.buyer.avatar}
                    title={order.buyer.name}
                    subTitle={order.buyer.username}
                  />
                </Td>
                <Td>{Object.keys(order.products).length}</Td>
                <Td>
                  <StatusBadge status={order.status} />
                </Td>
                <Td>{getDate(order.timestamp)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Text textAlign="center" mt={8}>
          {ordersLoading
            ? "Loading my shop orders..."
            : `I've no ${filterMessage} orders made to my shop`}
        </Text>
      )}
      <Pagination
        currentPage={currentPage}
        itemsCount={filtered.length}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
      />
    </Box>
  );
};

export default OrdersPage;
