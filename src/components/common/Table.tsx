import { Box, TableProps } from "@chakra-ui/react";

import { scrollBarModifierCss } from "../../data/general";

const Table = ({ children, ...tableProps }: TableProps) => (
  <Box whiteSpace="nowrap" overflowX="auto" css={scrollBarModifierCss}>
    <Table {...tableProps}>{children}</Table>
  </Box>
);

export default Table;
