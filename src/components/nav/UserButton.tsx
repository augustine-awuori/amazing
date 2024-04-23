import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";

import { Avatar, MenuContent, Modal } from "../../components/common";
import { getControls } from "../../data/userControls";
import { Item } from "../../components/common/Selector";
import { MediaQueryUser } from "../../components/common/MediaQuery";
import { useAppColorMode } from "../../hooks";
import auth from "../../services/auth";
import empty from "../../utils/empty";

interface Props {
  user: MediaQueryUser | null | undefined;
}

const UserButton = ({ user }: Props) => {
  const { isDarkMode, toggleColorMode } = useAppColorMode();
  const [controls, setControls] = useState<Item[]>([]);
  const [showLogoutPrompt, setShowLogoutPrompt] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    initAuthControls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id, isDarkMode]);

  const { name, avatar }: MediaQueryUser = user || empty.user;

  function initAuthControls() {
    setControls(getControls(user, isDarkMode));
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
