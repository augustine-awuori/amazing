import { Box, Table, TableProps } from "@chakra-ui/react";

import { scrollBarModifierCss } from "../../data/general";
import { Thead } from "../common";
import { Order } from "../../hooks/useOrder";
import Tbody from "./Tbody";

interface Props extends TableProps {
  orders: Order[];
}

const headings = ["Shop", "Products", "Status", "Ordered Date"];

const OrdersTable = ({ orders, ...tableProps }: Props) => (
  <Box whiteSpace="nowrap" overflowX="auto" css={scrollBarModifierCss}>
    <Table {...tableProps}>
      <Thead headings={headings} />
      <Tbody orders={orders} />
    </Table>
  </Box>
);

export default OrdersTable;
