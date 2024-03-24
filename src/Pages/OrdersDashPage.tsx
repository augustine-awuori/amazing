import { Box, Flex } from "@chakra-ui/react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Grid, Heading, Image, Text } from "../components";
import { Card } from "../components/card";
import incomingOrderImage from "../assets/incoming-orders.jpg";
import outgoingOrderImage from "../assets/outgoing-orders.jpeg";
import auth from "../services/auth";

interface OrderType {
  description: string;
  icon: JSX.Element;
  image: string;
  pageRoute: string;
  title: string;
}

const orderTypes: OrderType[] = [
  {
    description: "The orders I placed myself to other shops",
    icon: <BsArrowUp />,
    image: incomingOrderImage,
    pageRoute: "orders/my",
    title: "Outgoing Orders",
  },
  {
    description: "The orders others placed to my shop",
    icon: <BsArrowDown />,
    image: outgoingOrderImage,
    pageRoute: "orders",
    title: "Incoming Orders",
  },
];

const OrdersDashPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    if (!auth.getCurrentUser()) {
      toast.info("Login to see your orders");
      return navigate("/login");
    }

    navigate(route);
  };

  return (
    <>
      <Heading textAlign="center" mb={3}>
        Select the type of orders
      </Heading>
      <Grid columns={{ sm: 1, md: 2 }}>
        {orderTypes.map(({ description, icon, image, pageRoute, title }) => (
          <Card onClick={() => handleNavigation(pageRoute)}>
            <Image src={image} w="100%" objectFit="cover" />
            <Box py={2} px={4}>
              <Flex align="center">
                <Text fontWeight="extrabold" fontSize="2xl" mr={1}>
                  {title}
                </Text>
                {icon}
              </Flex>
              <Text color="whiteAlpha.500" mt={1.5}>
                {description}
              </Text>
            </Box>
          </Card>
        ))}
      </Grid>
    </>
  );
};

export default OrdersDashPage;
