import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

export interface Item {
  _id: string;
  label: string;
}

interface Props {
  data: Item[];
  name?: string;
  onSelectItem: (item: Item) => void;
  selectedItem: Item | null;
}

const Selector = ({
  data,
  name = "Categories",
  onSelectItem,
  selectedItem,
}: Props) => (
  <Menu>
    <MenuButton as={Button} rightIcon={<BsChevronDown />}>
      {selectedItem?.label || name}
    </MenuButton>
    <MenuList>
      {data.map((item) => (
        <MenuItem
          key={item._id}
          fontFamily="andika"
          onClick={() => onSelectItem(item)}
        >
          {item.label}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);

export default Selector;
