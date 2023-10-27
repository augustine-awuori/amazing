import { MenuList, MenuItem } from "@chakra-ui/react";
import { Item } from "./Selector";

export interface MenuListProps {
  data: Item[];
  onSelectItem: (item: Item) => void;
}

const SelectorMenuList = ({ data, onSelectItem }: MenuListProps) => (
  <MenuList>
    {data.map((item, index) => (
      <MenuItem
        key={item._id + index}
        fontFamily="andika"
        onClick={() => onSelectItem(item)}
      >
        {item.label}
      </MenuItem>
    ))}
  </MenuList>
);

export default SelectorMenuList;
