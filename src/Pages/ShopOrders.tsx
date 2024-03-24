import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Box, Spinner } from "@chakra-ui/react";

import { empty } from "../utils";
import { Heading, Text } from "../components";
import { OrdersTable } from "../components/shops";
import { BadgesList, Pagination } from "../components/common";
import { Order } from "../hooks/useOrder";
import { paginate } from "../utils/paginate";
import { Status } from "../hooks/useStatus";
import { useNoGrid, useOrders, useStatus } from "../hooks";
import auth from "../services/auth";

const OrdersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [selectedStatus, setSelectedStatus] = useState<Status>(empty.status);
  const { isLoading, orders } = useOrders(`${useParams().shopId}`);
  const { status, isLoading: statusLoading } = useStatus();
  useNoGrid();

  const filtered = selectedStatus._id
    ? orders.filter(({ status }) => status._id === selectedStatus._id)
    : orders;

  const paginated = paginate<Order>(filtered, currentPage, pageSize);

  const handleStatusSelect = (status: Status) => {
    setCurrentPage(1);
    setSelectedStatus(status);
  };

  if (!auth.getCurrentUser()) return <Navigate to="/login" />;

  return (
    <Box pt="4.5rem" px={10}>
      <Heading as="h1" textAlign="center">
        My Shop Orders
      </Heading>
      <Text color="whiteAlpha.500" mt={3} textAlign="center" mb={8}>
        The orders others placed to my shop
      </Text>
      <BadgesList
        list={status}
        loading={statusLoading}
        onItemSelect={(status) => handleStatusSelect(status as Status)}
        selectedItem={selectedStatus}
      />
      {isLoading && <Spinner mt={10} alignSelf="center" alignItems="center" />}
      {paginated.length ? (
        <OrdersTable mt={5} orders={paginated} />
      ) : (
        <Text textAlign="center" mt={8}>
          You've no "{selectedStatus._id && selectedStatus.label.toLowerCase()}"
          orders made to your shop
        </Text>
      )}
      <Box mt={5}>
        <Pagination
          currentPage={currentPage}
          itemsCount={filtered.length}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
        />
      </Box>
    </Box>
  );
};

export default OrdersPage;
