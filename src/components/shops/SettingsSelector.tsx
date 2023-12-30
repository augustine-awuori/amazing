import { Button, Menu, MenuButton } from "@chakra-ui/react";
import { AiFillSetting } from "react-icons/ai";

import { Item } from "../../components/common/Selector";
import SelectorMenuList, {
  MenuListProps,
} from "../../components/common/SelectorMenuList";

interface Props extends MenuListProps {
  onShowSettings: (setting: Setting | null) => void;
  showIconsOnly: boolean | undefined;
}

export interface Setting extends Item {
  onClick: () => void;
}

const SettingsSelector = ({
  showIconsOnly,
  onSelectItem,
  ...otherProps
}: Props) => {
  const handleSelectItem = (item: Item) => {
    (item as Setting).onClick();
    onSelectItem(item);
  };

  return (
    <Menu>
      <MenuButton mr={3} pl={showIconsOnly ? 1.5 : 1}>
        <Button rightIcon={<AiFillSetting />} pl={showIconsOnly ? 1 : 4}>
          {showIconsOnly ? "" : "Settings"}
        </Button>
      </MenuButton>
      <SelectorMenuList onSelectItem={handleSelectItem} {...otherProps} />
    </Menu>
  );
};

export default SettingsSelector;
