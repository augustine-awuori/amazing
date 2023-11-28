import { useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";
import { z } from "zod";

import { Button, Modal, PageContainer } from "../components";
import { useCart, useForm, useOrders } from "../hooks";
import CartTable from "../components/shops/ShoppingCartTable";
import DismissableInfo from "../components/common/DismissableInfo";
import MessageField from "../components/form/TextAreaField";
import auth from "../services/auth";

const info =
  "When you place an order, the shop owner will contact you to arrange delivery and payment.";

const schema = z.object({ message: z.string() });

const ShoppingCartPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [authModalShown, setAuthModal] = useState(false);
  const [takingMessage, setTakingMessage] = useState(false);
  const [message, setMessage] = useState("");
  const { errors, register } = useForm(schema);
  const [isLoading, setLoading] = useState(false);
  const cart = useCart();
  const helper = useOrders();
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

  const closeModal = () => setShowModal(false);

  const handlePositiveResponse = async () => {
    if (!takingMessage) return setTakingMessage(true);

    closeModal();
    setLoading(true);
    await helper.makeShopsOrders(message);
    setLoading(false);
  };

  const handleOrderPlacement = () =>
    auth.getCurrentUser() ? setShowModal(true) : setAuthModal(true);

  return (
    <PageContainer>
      {isLoading && <Spinner />}
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
        onSecondaryClick={closeModal}
        primaryBtnLabel={takingMessage ? "Send Message" : "Yes, add"}
        secondaryBtnLabel="Skip"
        title="Order Message"
      />
      <DismissableInfo info={info} />
      <CartTable />
      {cart.count && (
        <Button
          isLoading={isLoading}
          mt={7}
          rightIcon={<FaPaperPlane />}
          onClick={handleOrderPlacement}
        >
          Send Order
        </Button>
      )}
    </PageContainer>
  );
};

export default ShoppingCartPage;
