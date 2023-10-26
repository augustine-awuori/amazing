import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { HStack, IconButton, Spinner } from "@chakra-ui/react";
import { FaChevronLeft, FaPaperPlane } from "react-icons/fa";
import { z } from "zod";

import { appBaseUrl } from "../services/client";
import { Button, Heading, Modal, PageContainer } from "../components";
import { Order } from "../hooks/useOrder";
import { useBag, useForm, useOrders, useShop } from "../hooks";
import auth from "../services/auth";
import BagTable from "../components/shops/BagTable";
import DismissableInfo from "../components/common/DismissableInfo";
import MessageField from "../components/form/TextAreaField";
import util from "../utils/funcs";

const info =
  "When you place an order, the shop owner will contact you to arrange delivery and payment.";

const schema = z.object({ message: z.string() });

const ShoppingBagPage = () => {
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [takingMessage, setTakingMessage] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { bag, setBag } = useBag();
  const { errors, register } = useForm(schema);
  const { shop } = useShop();
  const helper = useOrders();
  const navigate = useNavigate();
  const user = auth.getCurrentUser();

  let products = [...bag.products];

  const closeModal = () => setShowModal(false);

  const sendWhatsAppNotification = (orderId: string) =>
    util.navTo(`${appBaseUrl}notifications/orders/${orderId}`, message);

  const clearBag = () => {
    setBag({ ids: {}, products: [] });
    products = [];
  };

  const handlePositiveResponse = async () => {
    if (!takingMessage) return setTakingMessage(true);

    closeModal();

    setLoading(true);
    const { data, ok } = await helper.makeOrder(products, message);
    setLoading(false);
    if (ok) {
      clearBag();
      sendWhatsAppNotification((data as Order)._id);
    }
  };

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

  if (!user) return <Navigate to="/login" replace />;

  return (
    <PageContainer>
      {isLoading && <Spinner />}
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
      <HStack alignItems="center">
        <IconButton
          aria-label="button"
          icon={<FaChevronLeft />}
          size="md"
          rounded={50}
          onClick={() => navigate(-1)}
        />
        <Heading mb={3} ml={1}>
          {`${shop?.name}'s Shopping Bag`}
        </Heading>
      </HStack>
      <BagTable />
      {products.length && (
        <Button
          isLoading={isLoading}
          mt={7}
          rightIcon={<FaPaperPlane />}
          onClick={() => setShowModal(true)}
        >
          Send Order
        </Button>
      )}
    </PageContainer>
  );
};

export default ShoppingBagPage;
