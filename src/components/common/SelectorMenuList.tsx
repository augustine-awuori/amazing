import { MenuList, MenuItem, Flex, Box } from "@chakra-ui/react";

import { ControlItem } from "../../data/userControls";
import { Item } from "./Selector";

export interface MenuListProps {
  data: Item[] | ControlItem[];
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
        <Flex align="center" letterSpacing=".59px">
          <Box mr={2}>{(item as ControlItem).icon}</Box>
          {item.label}
        </Flex>
      </MenuItem>
    ))}
  </MenuList>
);

export default SelectorMenuList;
