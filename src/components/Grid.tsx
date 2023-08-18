import { SimpleGrid } from "@chakra-ui/react";

interface Props {
  children: any;
}

const Grid = ({ children }: Props) => {
  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      padding="10px"
      spacing={6}
    >
      {children}
    </SimpleGrid>
  );
};

export default Grid;
