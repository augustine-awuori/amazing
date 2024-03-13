import { Menu, MenuButton } from "@chakra-ui/react";

import SelectorMenuList, { MenuListProps } from "./SelectorMenuList";

interface Props extends MenuListProps {
  Button: JSX.Element;
}

const MenuContent = ({ Button, ...otherProps }: Props) => (
  <Menu>
    <MenuButton>{Button}</MenuButton>
    <SelectorMenuList {...otherProps} />
  </Menu>
);

export default MenuContent;
