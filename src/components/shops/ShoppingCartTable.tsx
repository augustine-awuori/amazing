import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Box, Table, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";

import { Button, Heading, Modal, Text } from "..";
import { figure } from "../../utils";
import { Product } from "./product/Card";
import useCart from "../../hooks/useCart";

export interface BagProduct extends Product {
  deleted: boolean;
}

const CartTable = () => {
  const [addedProducts, setCartProducts] = useState<BagProduct[]>([]);
  const [modalOpen, setModalVisibility] = useState(false);
  const [productId, setProductId] = useState("");
  const cart = useCart();

  const cartProducts = cart.getProducts();

  useEffect(() => {
    setCartProducts(
      cartProducts.map((p) => ({ ...p, deleted: false, quantity: 1 }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartProducts.length]);

  const handleIncrease = (id: string) => {
    const updated = addedProducts.map((p) => {
      if (p._id === id) p.quantity += 1;

      return p;
    });

    setCartProducts(updated);
  };

  const handleDecrease = (id: string) => {
    const updated = addedProducts.map((p) => {
      if (p._id !== id) return p;

      p.quantity === 1
        ? toast.info("Delete it if you really wanna")
        : (p.quantity -= 1);

      return p;
    });

    setCartProducts(updated);
  };

  const handleRemoval = () => {
    setModalVisibility(false);
    cart.remove(productId);
  };

  const handleAbort = (): void => {
    setCartProducts(
      addedProducts.map((p) => {
        if (p.deleted) p.deleted = false;

        return p;
      })
    );

    setModalVisibility(false);
  };

  const getGrandTotal = () => {
    const grandTotal = addedProducts.reduce(
      (total, { price, quantity }) => total + price * quantity,
      0
    );

    return figure.roundToTwoDecimalPlaces(grandTotal);
  };

  if (!cart.count)
    return (
      <Heading
        as="h2"
        fontSize="md"
        textAlign="center"
        mt={10}
        color="green.300"
      >
        Your bag is empty! Go back to add some items to it
      </Heading>
    );

  return (
    <>
      <Modal
        content="Are you sure you want to permanently remove this item from your bag?"
        isOpen={modalOpen}
        onModalClose={() => setModalVisibility(false)}
        title="Item Removal Confirmation"
        onPrimaryClick={handleRemoval}
        onSecondaryClick={handleAbort}
        primaryBtnLabel="Yes, Remove"
        secondaryBtnLabel="Abort"
      />
      <Box whiteSpace="nowrap" overflowX="auto">
        <Table w="100%">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Qty</Th>
              <Th>Total</Th>
              <Th />
              <Th />
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {addedProducts.map(({ _id, name, price, quantity }, index) => (
              <Tr key={index}>
                <Td>
                  <Text isTruncated maxW="150px">
                    {name}
                  </Text>
                </Td>
                <Td>{quantity}</Td>
                <Td fontWeight="bold">{price * quantity}</Td>
                <Td p={0}>
                  <Button size="sm" onClick={() => handleDecrease(_id)}>
                    -
                  </Button>
                </Td>
                <Td p={0}>
                  <Button size="sm" onClick={() => handleIncrease(_id)}>
                    +
                  </Button>
                </Td>
                <Td p={0}>
                  <Button
                    bgColor="tomato"
                    _hover={{ bgColor: "red.500" }}
                    size="sm"
                    onClick={() => {
                      setModalVisibility(true);
                      setProductId(_id);
                    }}
                  >
                    x
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Td>Grand Total</Td>
              <Td />
              <Td fontWeight="extrabold" color="orange.400">
                {getGrandTotal()}
              </Td>
              <Td />
              <Td />
              <Td />
            </Tr>
          </Tfoot>
        </Table>
      </Box>
    </>
  );
};

export default CartTable;
