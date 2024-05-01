import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { Badge, IconButton } from "@chakra-ui/react";
import { BiBell } from "react-icons/bi";

import { Avatar, MenuContent, Modal } from "../../components/common";
import { empty, funcs } from "../../utils";
import { getControls } from "../../data/userControls";
import { Item } from "../../components/common/Selector";
import { MediaQueryUser } from "../../components/common/MediaQuery";
import { useAppColorMode, useNotifications } from "../../hooks";
import auth from "../../services/auth";

interface Props {
  user: MediaQueryUser | null | undefined;
}

const UserButton = ({ user }: Props) => {
  const [controls, setControls] = useState<Item[]>([]);
  const [showLogoutPrompt, setShowLogoutPrompt] = useState(false);
  const { count } = useNotifications();
  const { isDarkMode, toggleColorMode } = useAppColorMode();
  const navigate = useNavigate();

  useEffect(() => {
    initAuthControls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id, isDarkMode]);

  const { name, avatar }: MediaQueryUser = user || empty.user;

  function initAuthControls() {
    const notificationItem: Item = {
      _id: "",
      label: "Notifications",
      icon: <BiBell size={20} />,
      route: "/notifications",
      rightIcon: <Badge borderRadius="full">{count}</Badge>,
    };

    const controls = getControls(user, isDarkMode);
    setControls(funcs.insertAtIndex<Item>(controls, 1, notificationItem));
  }

  const handleSelection = (item: Item) => {
    //TODO: Encapsulate this route to a single file
    if (item.route === "/logout") return setShowLogoutPrompt(true);

    item.route ? navigate(item.route) : toggleColorMode();
  };

  const handleModalClose = () => setShowLogoutPrompt(false);

  const UserAvatar = () => {
    if (!name)
      return (
        <IconButton
          size="sm"
          borderRadius="full"
          icon={<FaUserPlus name={name} />}
          aria-label="user-button"
        />
      );

    return <Avatar name={name} size={{ base: "xs", md: "sm" }} src={avatar} />;
  };

  return (
    <>
      <Modal
        content={`Are you sure you want to sign out? \nPlease remember your username "${
          auth.getCurrentUser()?.username
        }" Use it to login in next time, without the @ sign`}
        isOpen={showLogoutPrompt}
        onModalClose={handleModalClose}
        title="Signing Out ..."
        primaryBtnLabel="I'm Sure"
        secondaryBtnLabel="Not Now"
        onPrimaryClick={() => navigate("/logout")}
        onSecondaryClick={handleModalClose}
      />
      <MenuContent
        Button={<UserAvatar />}
        data={controls}
        onSelectItem={handleSelection}
      />
    </>
  );
};

export default UserButton;
