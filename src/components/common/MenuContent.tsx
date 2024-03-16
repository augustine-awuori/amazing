import { Menu, MenuButton } from "@chakra-ui/react";

import SelectorMenuList, { MenuListProps } from "./SelectorMenuList";

interface Props extends MenuListProps {
  Button: JSX.Element;
  buttonWidth?: string;
}

const MenuContent = ({
  Button,
  buttonWidth = "auto",
  ...otherProps
}: Props) => (
  <Menu>
    <MenuButton w={buttonWidth}>{Button}</MenuButton>
    <SelectorMenuList {...otherProps} />
  </Menu>
);

export default MenuContent;
