import { useState } from "react";
import { Tbody, Td, Tfoot, Tr } from "@chakra-ui/react";

import { Button, Heading, Modal, Text } from "..";
import { Thead } from "../common";
import { useCart, useNoGrid } from "../../hooks";
import Table from "../common/table/Table";

const CartTable = () => {
  const [modalOpen, setModalVisibility] = useState(false);
  const [productId, setProductId] = useState("");
  const cart = useCart();
  useNoGrid();

  const handleRemoval = () => {
    setModalVisibility(false);
    cart.remove(productId);
  };

  const handleAbort = (): void => {
    cart.setProducts(
      cart.products.map((p) => {
        if (p.deleted) p.deleted = false;

        return p;
      })
    );

    setModalVisibility(false);
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
      <Heading my={3}>Shopping Cart</Heading>
      <Table>
        <Thead headings={["Name", "Qty", "Total", "", "", ""]} />
        <Tbody>
          {cart.products.map(({ _id, name, price, quantity }, index) => (
            <Tr key={index}>
              <Td>
                <Text isTruncated maxW="150px">
                  {name}
                </Text>
              </Td>
              <Td>{quantity}</Td>
              <Td fontWeight="bold">{price * quantity}</Td>
              <Td p={0}>
                <Button size="sm" onClick={() => cart.decrementQuantity(_id)}>
                  -
                </Button>
              </Td>
              <Td p={0}>
                <Button size="sm" onClick={() => cart.incrementQuantity(_id)}>
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
              {cart.getCartGrandTotal()}
            </Td>
            <Td />
            <Td />
            <Td />
          </Tr>
        </Tfoot>
      </Table>
    </>
  );
};

export default CartTable;
