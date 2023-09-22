import { useState } from "react";
import { Box, Table, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";

import { Button, Heading, Modal, Text } from "../../components";
import figure from "../../utils/figure";

export interface BagProduct {
  _id: string;
  deleted: boolean;
  name: string;
  price: number;
  quantity: number;
}

const BagTable = ({ data }: { data: BagProduct[] }) => {
  const [products, setProducts] = useState(data);
  const [modalOpen, setModalVisibility] = useState(false);

  const handleRemovalRequest = (name: string) => {
    setProducts(
      products.map((p) => {
        if (p.name === name) {
          p.deleted = true;
        }

        return p;
      })
    );

    setModalVisibility(true);
  };

  const handleReduce = (name: string, deleted: boolean) =>
    setProducts(
      products.map((p) => {
        if (p.name === name) {
          deleted ? handleRemovalRequest(name) : (p.quantity -= 1);
        }

        return p;
      })
    );

  const handleIncrease = (name: string) =>
    setProducts(
      products.map((p) => {
        if (p.name === name) {
          p.quantity += 1;
        }

        return p;
      })
    );

  const handleRemoval = () => {
    setModalVisibility(false);
    setProducts(products.filter((p) => !p.deleted));
  };

  const handleAbort = () => {
    setProducts(
      products.map((p) => {
        if (p.deleted) p.deleted = false;

        return p;
      })
    );

    setModalVisibility(false);
  };

  const getGrandTotal = () => {
    const total = products.reduce(
      (total, { price, quantity }) => total + quantity * price,
      0
    );

    return figure.roundToTwoDecimalPlaces(total);
  };

  if (!products.length)
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
              <Th>Unit</Th>
              <Th>Total</Th>
              <Th />
              <Th />
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {products.map(({ name, price, quantity }, index) => (
              <Tr key={index}>
                <Td>
                  <Text isTruncated maxW="150px">
                    {name}
                  </Text>
                </Td>
                <Td>{quantity}</Td>
                <Td>{price}</Td>
                <Td fontWeight="bold">{quantity * price}</Td>
                <Td p={0}>
                  <Button
                    size="sm"
                    onClick={() => handleReduce(name, quantity === 1)}
                  >
                    -
                  </Button>
                </Td>
                <Td p={0}>
                  <Button size="sm" onClick={() => handleIncrease(name)}>
                    +
                  </Button>
                </Td>
                <Td p={0}>
                  <Button
                    bgColor="tomato"
                    _hover={{ bgColor: "red.500" }}
                    size="sm"
                    onClick={() => handleRemovalRequest(name)}
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
              <Td />
              <Td fontWeight="extrabold" color="orange.400">
                {getGrandTotal()}
              </Td>
              <Td />
              <Td />
            </Tr>
          </Tfoot>
        </Table>
      </Box>
    </>
  );
};

export default BagTable;
