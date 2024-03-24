import { TableProps } from "@chakra-ui/react";

import { Order } from "../../hooks/useOrder";
import { Table, Thead } from "../common";
import Tbody from "./Tbody";

interface Props extends TableProps {
  orders: Order[];
}

const OrdersTable = ({ orders, ...tableProps }: Props) => (
  <Table {...tableProps}>
    <Thead headings={["Customer", "Products", "Status", "Ordered Date"]} />
    <Tbody orders={orders} />
  </Table>
);

export default OrdersTable;
