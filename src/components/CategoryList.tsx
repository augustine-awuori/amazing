import {
  Button,
  HStack,
  Heading,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";

import useCategories, { Category } from "../hooks/useCategories";

interface Props {
  onSelectedCategory: (category: Category) => void;
  selectedCategory: Category | null;
}

const GenreList = ({ onSelectedCategory, selectedCategory }: Props) => {
  const { data: categories, error, isLoading } = useCategories();

  if (error) return null;

  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading fontSize={20} marginBottom={3}>
        Categories
      </Heading>
      <List>
        {categories.map((category) => (
          <ListItem key={category._id} paddingY="5px">
            <HStack>
              <Button
                fontSize="lg"
                fontWeight={
                  category._id === selectedCategory?._id ? "bold" : "normal"
                }
                onClick={() => onSelectedCategory(category)}
                textAlign="left"
                variant="link"
                whiteSpace="normal"
              >
                {category.label}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
