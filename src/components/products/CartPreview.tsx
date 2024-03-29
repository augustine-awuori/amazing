import { useState } from "react";
import { Box, Divider, Flex, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button, Heading, Modal, Text } from "..";
import { DeleteIcon } from "../icons";
import { useCart, useForm, useOrders } from "../../hooks";
import auth from "../../services/auth";
import CartItem from "./SideCartItem";
import MessageField from "../form/TextAreaField";

const schema = z.object({ message: z.string() });

const SideCart = () => {
  const [showModal, setShowModal] = useState(false);
  const [takingMessage, setTakingMessage] = useState(false);
  const { errors, register } = useForm(schema);
  const [message, setMessage] = useState("");
  const [authModalShown, setAuthModal] = useState(false);
  const [isSendingOrder, setSendingOrder] = useState(false);
  const [confirmCancelation, setCancelConfirmation] = useState(false);
  const helper = useOrders();
  const cart = useCart();
  const navigate = useNavigate();

  const content = takingMessage ? (
    <MessageField
      error={errors.message}
      label="Message"
      onChange={setMessage}
      register={register}
    />
  ) : (
    "Would you like to attach a message to your order?"
  );

  const handleOrderPlacement = () =>
    auth.getCurrentUser() ? setShowModal(true) : setAuthModal(true);

  const closeModal = () => setShowModal(false);

  const sendOrder = async () => {
    closeModal();

    setSendingOrder(true);
    await helper.makeShopsOrders(message);
    setSendingOrder(false);
  };

  const handlePositiveResponse = async () => {
    if (!takingMessage) return setTakingMessage(true);

    sendOrder();
  };

  if (!cart.count)
    return (
      <Text textAlign="center" color="yellow">
        Your cart is empty!
      </Text>
    );

  return (
    <Box>
      <Modal
        content="The shop owners need to know who you are. If you don't have time to login just 'Start Chat' them on WhatsApp"
        isOpen={authModalShown}
        onModalClose={() => setAuthModal(false)}
        onPrimaryClick={() => navigate("/login")}
        onSecondaryClick={() => navigate("/register")}
        primaryBtnLabel="Login"
        secondaryBtnLabel="Register"
        title="Who's Ordering"
      />
      <Modal
        content={content}
        isOpen={showModal}
        onModalClose={closeModal}
        onPrimaryClick={handlePositiveResponse}
        onSecondaryClick={sendOrder}
        primaryBtnLabel={takingMessage ? "Send Message" : "Yes, add"}
        secondaryBtnLabel="Skip"
        title="Order Message"
      />
      <Modal
        title="Empty Cart Request"
        content="Are you sure you want to empty your cart?"
        isOpen={confirmCancelation}
        onModalClose={() => setCancelConfirmation(false)}
        primaryBtnLabel="Empty"
        secondaryBtnLabel="Abort"
        PrimaryLeftIcon={<DeleteIcon />}
        onPrimaryClick={cart.clear}
      />
      <Flex w="100%" align="center" justify="space-between">
        <Heading textAlign="center" mb={3.5} fontSize={20}>
          Cart Preview
        </Heading>
        {isSendingOrder && <Spinner size="sm" />}
      </Flex>
      <Divider />
      <Flex py={2} justify="space-between" align="center">
        <Button
          bg="red.300"
          _hover={{ bg: "red.500" }}
          onClick={() => setCancelConfirmation(true)}
        >
          Cancel
        </Button>
        <Text
          onClick={handleOrderPlacement}
          cursor="pointer"
          p={2}
          _hover={{ bg: "orange.400", borderRadius: 7 }}
        >
          Ksh {cart.getCartGrandTotal()}
        </Text>
      </Flex>
      <Divider mb={3} />
      {cart.products.map((p, index) => (
        <CartItem
          {...p}
          key={index}
          onQuantityDecrement={cart.decrementQuantity}
          onQuantityIncrement={cart.incrementQuantity}
        />
      ))}
    </Box>
  );
};

export default SideCart;
