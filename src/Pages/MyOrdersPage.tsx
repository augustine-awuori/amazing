import { useState } from "react";
import { Box, Spinner } from "@chakra-ui/react";

import { BadgesList, Pagination } from "../components/common";
import { empty } from "../utils";
import { Heading, Text } from "../components";
import { Order } from "../hooks/useOrder";
import { paginate } from "../utils/paginate";
import { useNoGrid, useOrders } from "../hooks";
import auth from "../services/auth";
import OrdersTable from "../components/order/OrdersTable";
import useStatus, { Status } from "../hooks/useStatus";

const MyOrdersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [selectedStatus, setSelectedStatus] = useState<Status>(empty.status);
  const user = auth.getCurrentUser();
  const { isLoading: ordersLoading, orders } = useOrders(`${user?._id}`);
  const { status, isLoading: statusLoading } = useStatus();
  useNoGrid();

  const filtered = selectedStatus._id
    ? orders.filter(({ status }) => status._id === selectedStatus._id)
    : orders;

  const paginated = paginate<Order>(filtered, currentPage, pageSize);

  return (
    <Box pt="4.5rem" px={10}>
      <Heading as="h1" textAlign="center">
        My Orders
      </Heading>
      <Text color="whiteAlpha.500" mt={3} textAlign="center" mb={8}>
        The orders I placed myself to other shops
      </Text>
      {selectedStatus._id && (
        <Heading as="h2" fontSize="md" mt={8} textAlign="center">
          Showing {filtered.length} "{selectedStatus.label}" orders
        </Heading>
      )}
      <BadgesList
        list={status}
        loading={statusLoading}
        onItemSelect={(status) => setSelectedStatus(status as Status)}
        selectedItem={selectedStatus}
      />
      {ordersLoading && (
        <Spinner mt={10} alignSelf="center" alignItems="center" />
      )}
      {paginated.length ? (
        <OrdersTable orders={paginated} mt={5} />
      ) : (
        <Text textAlign="center" mt={8}>
          You've not placed "
          {selectedStatus._id ? selectedStatus.label.toLowerCase() : "any"}"
          orders yet! Add products to start...
        </Text>
      )}
      <Pagination
        currentPage={currentPage}
        itemsCount={filtered.length}
        mt={5}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
      />
    </Box>
  );
};

export default MyOrdersPage;
