import { TableProps } from "@chakra-ui/react";

import { Table, Thead } from "../common";
import { Order } from "../../hooks/useOrder";
import Tbody from "./Tbody";

interface Props extends TableProps {
  orders: Order[];
}

const OrdersTable = ({ orders, ...tableProps }: Props) => (
  <Table {...tableProps}>
    <Thead headings={["Shop", "Products", "Status", "Ordered Date"]} />
    <Tbody orders={orders} />
  </Table>
);

export default OrdersTable;
