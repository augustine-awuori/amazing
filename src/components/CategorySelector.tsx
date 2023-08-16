import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

import useCategories, { Category } from "../hooks/useCategories";

interface Props {
  onSelectCategory: (category: Category) => void;
  selectedCategory: Category | null;
}

const PlatformSelector = ({ onSelectCategory, selectedCategory }: Props) => {
  const { data: categories, error } = useCategories();

  if (error) return null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedCategory?.label || "Categories"}
      </MenuButton>
      <MenuList>
        {categories.map((category) => (
          <MenuItem
            key={category._id}
            onClick={() => onSelectCategory(category)}
          >
            {category.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PlatformSelector;
