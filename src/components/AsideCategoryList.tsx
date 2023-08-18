import { Box } from "@chakra-ui/react";
import { Category } from "../hooks/useCategories";
import CategoryList from "./CategoryList";

interface Props {
  onSelectCategory: (category: Category) => void;
  selectedCategory: Category | null;
}

const AsideCategoryList = ({ onSelectCategory, selectedCategory }: Props) => {
  return (
    <Box display={{ base: "none", lg: "block" }}>
      <CategoryList
        selectedCategory={selectedCategory}
        onSelectedCategory={onSelectCategory}
      />
    </Box>
  );
};

export default AsideCategoryList;
