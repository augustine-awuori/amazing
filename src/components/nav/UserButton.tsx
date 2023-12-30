import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton } from "@chakra-ui/react";

import { Avatar } from "../../components/common";
import { getControls } from "../../data/userControls";
import { Item } from "../../components/common/Selector";
import { MediaQueryUser } from "../../components/common/MediaQuery";
import { useAppColorMode } from "../../hooks";
import empty from "../../utils/empty";
import MenuList from "../common/SelectorMenuList";

interface Props {
  user: MediaQueryUser | null | undefined;
}

const UserButton = ({ user }: Props) => {
  const { isDarkMode, toggleColorMode } = useAppColorMode();
  const [controls, setControls] = useState<Item[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    initAuthControls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id, isDarkMode]);

  const { name, avatar }: MediaQueryUser = user || {
    ...empty.user,
    name: "?",
  };

  function initAuthControls() {
    setControls(getControls(user, isDarkMode));
  }

  const handleSelection = (item: Item) => {
    if (item.route) navigate(item.route);
    else toggleColorMode();
  };

  return (
    <Menu>
      <MenuButton>
        <Avatar name={name} size={{ base: "xs", md: "sm" }} src={avatar} />
      </MenuButton>
      <MenuList data={controls} onSelectItem={handleSelection} />
    </Menu>
  );
};

export default UserButton;
