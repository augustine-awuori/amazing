import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";

import { BadgesList, Pagination } from "../components/common";
import { empty } from "../utils";
import { Heading, Text } from "../components";
import { Order } from "../hooks/useOrder";
import { paginate } from "../utils/paginate";
import { useAppColorMode, useOrders } from "../hooks";
import auth from "../services/auth";
import OrdersTable from "../components/order/OrdersTable";
import useStatus, { Status } from "../hooks/useStatus";

const OrdersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [selectedStatus, setSelectedStatus] = useState<Status>(empty.status);
  const { accentColor } = useAppColorMode();
  const user = auth.getCurrentUser();
  const { isLoading: ordersLoading, orders } = useOrders(`${user?._id}`);
  const { status, isLoading: statusLoading } = useStatus();
  const navigate = useNavigate();

  const filtered = selectedStatus._id
    ? orders.filter(({ status }) => status._id === selectedStatus._id)
    : orders;

  const paginated = paginate<Order>(filtered, currentPage, pageSize);

  if (!user)
    return (
      <Flex mt={10} align="center" justify="center">
        <Text
          cursor="pointer"
          mr={1}
          color={accentColor}
          onClick={() => navigate("/login")}
        >
          Login
        </Text>
        <Text textAlign="center"> to see your recieved and sent orders.</Text>
      </Flex>
    );

  return (
    <>
      <BadgesList
        list={status}
        loading={statusLoading}
        onItemSelect={(status) => setSelectedStatus(status as Status)}
        selectedItem={selectedStatus}
      />
      {selectedStatus._id && (
        <Heading mt={8} textAlign="center">
          Showing {filtered.length} "{selectedStatus.label}" orders
        </Heading>
      )}
      {ordersLoading && <Spinner mt={10} alignSelf="center" />}
      {orders.length ? (
        <OrdersTable orders={paginated} mt={8} />
      ) : (
        <Text textAlign="center" mt={8}>
          You've not placed any orders yet! Add products to start...
        </Text>
      )}
      <Pagination
        currentPage={currentPage}
        itemsCount={filtered.length}
        mt={5}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
      />
    </>
  );
};

export default OrdersPage;
