import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Heading, PageContainer, Paragraph, Text } from "../components";
import useOrders from "../hooks/useOrders";

const NotificationsPage = () => {
  const { orders } = useOrders();
  const navigate = useNavigate();

  const viewOrders = () =>
    orders.length ? navigate("orders") : toast("You don't have any orders");

  return (
    <PageContainer>
      <Heading>Notifications</Heading>
      {orders && (
        <Paragraph>
          <Heading
            as="h2"
            fontSize={25}
            mt={5}
            _hover={{
              cursor: "pointer",
              color: "orange.400",
              textDecoration: "underline",
            }}
            onClick={viewOrders}
          >
            Orders
          </Heading>
          <Text>You have {orders.length} orders</Text>
        </Paragraph>
      )}
    </PageContainer>
  );
};

export default NotificationsPage;
