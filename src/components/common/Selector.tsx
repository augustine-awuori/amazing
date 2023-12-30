import { Button, Menu, MenuButton } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

import { ControlItem } from "../../data/userControls";
import SelectorMenuList, { MenuListProps } from "./SelectorMenuList";

export interface Item {
  _id: string;
  label: string;
}

interface Props extends MenuListProps {
  data: ControlItem[];
  name?: string;
  selectedItem: Item | null;
}

const Selector = ({ name = "Categories", selectedItem, ...rest }: Props) => (
  <Menu>
    <MenuButton as={Button} rightIcon={<BsChevronDown />} fontFamily="andika">
      {selectedItem?.label || name}
    </MenuButton>
    <SelectorMenuList {...rest} />
  </Menu>
);

export default Selector;
