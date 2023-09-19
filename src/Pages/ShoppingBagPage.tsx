import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, HStack, Heading, IconButton } from "@chakra-ui/react";
import { FaChevronLeft, FaPaperPlane } from "react-icons/fa";

import BagTable from "../components/shops/BagTable";
import DismissableInfo from "../components/common/DismissableInfo";
import PageContainer from "../components/PageContainer";
import useBag from "../hooks/useBag";

const message =
  "When you place an order, the shop owner will contact you to arrange delivery and payment.";

const ShoppingBagPage = () => {
  const { bag } = useBag();
  const navigate = useNavigate();

  const products = [...bag.products];

  const handleSendRequest = () => {
    toast.success("Request successfully sent!");
    toast("This functionality is not yet done. Coming soon.");
  };

  return (
    <PageContainer>
      <DismissableInfo message={message} />
      <HStack alignItems="center">
        <IconButton
          aria-label="button"
          icon={<FaChevronLeft />}
          size="md"
          rounded={50}
          onClick={() => navigate(-1)}
        />
        <Heading mb={3} ml={1}>
          {"Book Store - Shopping Bag"}
        </Heading>
      </HStack>
      <BagTable data={products.map((p) => ({ ...p, deleted: false }))} />
      {products.length ? (
        <Button mt={7} rightIcon={<FaPaperPlane />} onClick={handleSendRequest}>
          Send Order
        </Button>
      ) : null}
    </PageContainer>
  );
};

export default ShoppingBagPage;
