import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const { name, avatar }: MediaQueryUser = user || {
    ...empty.user,
    name: "?",
  };

  function initAuthControls() {
    setControls(getControls(user, isDarkMode));
  }

  const handleSelection = (item: Item) => {
    //TODO: Encapsulate this route to a single file
    if (item.route === "/logout") return setShowLogoutPrompt(true);

    item.route ? navigate(item.route) : toggleColorMode();
  };

  const handleModalClose = () => setShowLogoutPrompt(false);

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
        Button={
          <Avatar name={name} size={{ base: "xs", md: "sm" }} src={avatar} />
        }
        data={controls}
        onSelectItem={handleSelection}
      />
    </>
  );
};

export default UserButton;
