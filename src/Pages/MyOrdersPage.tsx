import { useState } from "react";
import { Box, Flex, Spinner, Tbody, Td } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Pagination, Thead } from "../components/common";
import { empty } from "../utils";
import { Heading, Text } from "../components";
import { Order } from "../hooks/useOrder";
import { paginate } from "../utils/paginate";
import { MediaQuery, StatusBadge, StatusBadgesList } from "../components/order";
import { Status } from "../hooks/useStatus";
import { useNoGrid, useOrders, useTimestamp } from "../hooks";
import auth from "../services/auth";
import Table from "../components/common/table/Table";
import Tr from "../components/common/table/Tr";

const MyOrdersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [selectedStatus, setSelectedStatus] = useState<Status>(empty.status);
  const user = auth.getCurrentUser();
  const { ordersLoading, orders } = useOrders(`${user?._id}`);
  const { getDate } = useTimestamp();
  const navigate = useNavigate();
  useNoGrid();

  const handleStatusSelect = (status: Status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const filtered = selectedStatus._id
    ? orders.filter(({ status }) => status._id === selectedStatus._id)
    : orders;

  const filterMessage = selectedStatus._id
    ? `"${selectedStatus.label.toLowerCase()}"`
    : "any";

  const paginated = paginate<Order>(filtered, currentPage, pageSize);

  return (
    <Box pt="4.5rem" px={10}>
      <Flex align="center" justify="center">
        <Heading as="h1" textAlign="center">
          My Orders
        </Heading>
        {ordersLoading && <Spinner ml={2} size="sm" />}
      </Flex>
      <Text color="whiteAlpha.500" mt={3} textAlign="center" mb={8}>
        The orders I placed myself to other shops
      </Text>
      {selectedStatus._id && (
        <Heading as="h2" fontSize="md" mt={8} textAlign="center">
          Showing {filtered.length} "{selectedStatus.label}" orders
        </Heading>
      )}
      <StatusBadgesList
        onStatusSelect={handleStatusSelect}
        selectedStatus={selectedStatus}
      />
      {paginated.length ? (
        <Table>
          <Thead headings={["Shop", "Products", "Status", "Ordered Date"]} />
          <Box my={2} />
          <Tbody>
            {paginated.map(
              ({ _id, products, shop, status, timestamp }, index) => (
                <Tr key={index} onClick={() => navigate(_id)}>
                  <Td>
                    <MediaQuery
                      image={shop.image}
                      title={shop.name}
                      subTitle={shop.location}
                    />
                  </Td>
                  <Td>{Object.keys(products).length}</Td>
                  <Td>
                    <StatusBadge status={status} />
                  </Td>
                  <Td>{getDate(timestamp)}</Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      ) : (
        <Text textAlign="center" mt={8}>
          You've not placed {filterMessage} orders yet! Add products to start...
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
