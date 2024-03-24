import { Box, Table, TableProps } from "@chakra-ui/react";

import { Order } from "../../hooks/useOrder";
import { scrollBarModifierCss } from "../../data/general";
import { Thead } from "../common";
import Tbody from "./Tbody";

interface Props extends TableProps {
  orders: Order[];
}

const headings = ["Customer", "Products", "Status", "Ordered Date"];

const OrdersTable = ({ orders, ...tableProps }: Props) => {
  return (
    <Box whiteSpace="nowrap" overflowX="auto" css={scrollBarModifierCss}>
      <Table {...tableProps}>
        <Thead headings={headings} />
        <Tbody orders={orders} />
      </Table>
    </Box>
  );
};

export default OrdersTable;
