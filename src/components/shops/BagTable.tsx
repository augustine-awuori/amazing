import { useEffect, useState } from "react";
import { Box, Table, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";

import { Button, Heading, Modal, Text } from "../../components";
import { figure, mapToProduct } from "../../utils";
import { Product } from "./product/Card";
import useBag from "../../hooks/useBag";

export interface BagProduct extends Product {
  deleted: boolean;
}

const BagTable = () => {
  const [products, setProducts] = useState<BagProduct[]>([]);
  const [modalOpen, setModalVisibility] = useState(false);
  const [productId, setProductId] = useState("");
  const { bag, setBag } = useBag();

  useEffect(() => {
    setProducts(bag.products.map((p) => ({ ...p, deleted: false })));
  }, [products.length]);

  const getBagProducts = (products: BagProduct[]): Product[] =>
    products.map(mapToProduct);

  const handleRemovalRequest = (id: string) => {
    setProducts(
      products.map((p) => {
        if (p._id === id) {
          p.deleted = true;
        }

        return p;
      })
    );

    setModalVisibility(true);
  };

  const handleReduce = (id: string, deleted: boolean) => {
    const updated = products.map((p) => {
      if (p._id === id) {
        deleted ? handleRemovalRequest(id) : (p.quantity -= 1);
      }

      return p;
    });

    setProducts(updated);
    setBag({
      ids: bag.ids,
      products: getBagProducts(updated),
    });
  };

  const handleIncrease = (id: string) => {
    const updated = products.map((p) => {
      if (p._id === id) {
        p.quantity += 1;
      }

      return p;
    });

    setProducts(updated);
    setBag({
      ids: bag.ids,
      products: getBagProducts(updated),
    });
  };

  const handleRemoval = () => {
    const ids = { ...bag.ids };
    delete ids[productId];

    setModalVisibility(false);
    setProducts(products.filter((p) => !p.deleted));
    setBag({ ids, products: bag.products.filter((p) => p._id !== productId) });
  };

  const handleAbort = (): void => {
    setProducts(
      products.map((p) => {
        if (p.deleted) p.deleted = false;

        return p;
      })
    );

    setModalVisibility(false);
  };

  const getGrandTotal = () => {
    const grandTotal = products.reduce(
      (total, { price, quantity }) => total + quantity * price,
      0
    );

    return figure.roundToTwoDecimalPlaces(grandTotal);
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
            {products.map(({ _id, name, price, quantity }, index) => (
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
                    onClick={() => {
                      setProductId(_id);
                      handleReduce(_id, quantity === 1);
                    }}
                  >
                    -
                  </Button>
                </Td>
                <Td p={0}>
                  <Button
                    size="sm"
                    onClick={() => {
                      setProductId(_id);
                      handleIncrease(_id);
                    }}
                  >
                    +
                  </Button>
                </Td>
                <Td p={0}>
                  <Button
                    bgColor="tomato"
                    _hover={{ bgColor: "red.500" }}
                    size="sm"
                    onClick={() => {
                      setProductId(_id);
                      handleRemovalRequest(_id);
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
