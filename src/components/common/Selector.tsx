import { Button, Menu, MenuButton } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

import { fontFamily } from "../../data/typography";
import SelectorMenuList, { MenuListProps } from "./SelectorMenuList";

export interface Item {
  _id: string;
  icon?: JSX.Element;
  label: string;
  onClick?: () => void;
  rightIcon?: JSX.Element;
  route?: string;
}

interface Props extends MenuListProps {
  data: Item[];
  name?: string;
  selectedItem: Item | null;
}

const Selector = ({ name = "Categories", selectedItem, ...rest }: Props) => (
  <Menu>
    <MenuButton
      as={Button}
      rightIcon={<BsChevronDown />}
      fontFamily={fontFamily}
    >
      {selectedItem?.label || name}
    </MenuButton>
    <SelectorMenuList {...rest} />
  </Menu>
);

export default Selector;
