import { useNavigate } from "react-router-dom";

import { Heading, PageContainer, Paragraph, Text } from "../components";
import auth from "../services/auth";
import useOrders from "../hooks/useOrders";

const NotificationsPage = () => {
  const { orders } = useOrders(auth.getCurrentUser()?._id || "");
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Heading>Notifications</Heading>
      <Paragraph>
        <Heading
          as="h2"
          fontSize={25}
          mb={2}
          mt={5}
          _hover={{
            cursor: "pointer",
            color: "orange.400",
            textDecoration: "underline",
          }}
          onClick={() => navigate("orders")}
        >
          Orders
        </Heading>
        <Text>You have {orders.length} orders</Text>
      </Paragraph>
    </PageContainer>
  );
};

export default NotificationsPage;
