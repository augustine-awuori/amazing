import { useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";
import { z } from "zod";

import { appBaseUrl } from "../services/client";
import { Button, Modal, PageContainer } from "../components";
import { Order } from "../hooks/useOrder";
import { useCart, useForm, useOrders, useProducts } from "../hooks";
import CartTable from "../components/shops/ShoppingCartTable";
import DismissableInfo from "../components/common/DismissableInfo";
import MessageField from "../components/form/TextAreaField";
import util from "../utils/funcs";
import { Product } from "components/shops/product/Card";

const info =
  "When you place an order, the shop owner will contact you to arrange delivery and payment.";

const schema = z.object({ message: z.string() });

const ShoppingCartPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [takingMessage, setTakingMessage] = useState(false);
  const [message, setMessage] = useState("");
  const { errors, register } = useForm(schema);
  const [isLoading, setLoading] = useState(false);
  const helper = useOrders();
  const { cartHasProduct, clearCart } = useCart();
  const { products } = useProducts(undefined);

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

  const sendWhatsAppNotification = (orderId: string) =>
    util.navTo(`${appBaseUrl}notifications/orders/${orderId}`, message);

  const handlePositiveResponse = async () => {
    if (!takingMessage) return setTakingMessage(true);

    closeModal();
    setLoading(true);
    const { data, ok } = await helper.makeOrder(products, message);
    setLoading(false);

    if (ok) {
      clearCart();
      sendWhatsAppNotification((data as Order)._id);
    }
  };

  const getProducts = (): Product[] => {
    const found: Product[] = [];

    products.forEach((p) => {
      if (cartHasProduct(p._id)) found.push(p);
    });

    return found;
  };

  const cartProducts = getProducts();

  return (
    <PageContainer maxW="700px" margin="0 auto">
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
      <CartTable products={cartProducts} />
      {cartProducts.length && (
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

export default ShoppingCartPage;
