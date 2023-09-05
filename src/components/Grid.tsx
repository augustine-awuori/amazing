import { SimpleGrid } from "@chakra-ui/react";

interface Props {
  children: any;
}

const Grid = ({ children }: Props) => {
  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      paddingY=".7rem"
      spacing={6}
    >
      {children}
    </SimpleGrid>
  );
};

export default Grid;
