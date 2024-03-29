import { Box, Table as AppTable, TableProps } from "@chakra-ui/react";

import { scrollBarModifierCss } from "../../../data/general";

const Table = ({ children, ...tableProps }: TableProps) => (
  <Box whiteSpace="nowrap" overflowX="auto" css={scrollBarModifierCss}>
    <AppTable {...tableProps}>{children}</AppTable>
  </Box>
);

export default Table;
