import { CategorySelectorProps as Props } from "./Selector";
import { GridAsideList } from "../../common";
import useCategories from "../../../hooks/useCategories";

const CategoryList = ({ onSelectCategory, selectedCategory }: Props) => {
  const { data: categories, error, isLoading } = useCategories();

  if (error) return null;

  return (
    <GridAsideList
      heading="Categories"
      isLoading={isLoading}
      items={categories}
      onSelectItem={onSelectCategory}
      selectedItem={selectedCategory}
    />
  );
};

export default CategoryList;
