import Selector from "../../common/Selector";
import useCategories, { Category } from "../../../hooks/useCategories";

export interface CategorySelectorProps {
  onSelectCategory: (category: Category) => void;
  selectedCategory: Category | null;
}

const CategorySelector = ({
  onSelectCategory,
  selectedCategory,
}: CategorySelectorProps) => {
  const { data: categories, error } = useCategories();

  if (error) return null;

  return (
    <Selector
      data={categories}
      onSelectItem={onSelectCategory}
      selectedItem={selectedCategory}
    />
  );
};

export default CategorySelector;
