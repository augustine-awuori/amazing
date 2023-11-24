import { SimpleGrid, SimpleGridProps } from "@chakra-ui/react";

const Grid = ({
  children,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  ...otherProps
}: SimpleGridProps) => (
  <SimpleGrid {...otherProps} columns={columns} paddingY=".7rem" spacing={6}>
    {children}
  </SimpleGrid>
);

export default Grid;
