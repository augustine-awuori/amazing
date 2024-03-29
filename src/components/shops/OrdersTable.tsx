import { TableProps } from "@chakra-ui/react";

import { Order } from "../../hooks/useOrder";
import { Thead } from "../common";
import Table from "../common/table/Table";
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
