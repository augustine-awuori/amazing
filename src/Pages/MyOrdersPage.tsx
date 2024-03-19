import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

import { BadgesList, Pagination } from "../components/common";
import { empty } from "../utils";
import { Heading, Info, Text } from "../components";
import { Order } from "../hooks/useOrder";
import { paginate } from "../utils/paginate";
import { useAppColorMode, useOrders } from "../hooks";
import auth from "../services/auth";
import OrdersTable from "../components/order/OrdersTable";
import useStatus, { Status } from "../hooks/useStatus";

const OrdersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [selectedStatus, setSelectedStatus] = useState<Status>(empty.status);
  const { accentColor } = useAppColorMode();
  const user = auth.getCurrentUser();
  const { isLoading, orders } = useOrders(`${user?._id}`);
  const { status, isLoading: statusLoading } = useStatus();
  const navigate = useNavigate();

  const filtered = selectedStatus._id
    ? orders.filter((order) => order.status._id === selectedStatus._id)
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

  if (!paginated.length)
    return (
      <Box h="100%" w="100%">
        <Info show={!isLoading} />
      </Box>
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
      <OrdersTable orders={filtered} mt={8} />
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
