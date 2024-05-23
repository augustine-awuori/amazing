import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserPlus } from "react-icons/fa";
import { Badge, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { BiBell, BiUser } from "react-icons/bi";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { BsGoogle } from "react-icons/bs";

import {
  Avatar,
  IconWithBadge,
  MenuContent,
  Modal,
} from "../../components/common";
import { empty } from "../../utils";
import { getControls } from "../../data/userControls";
import { Item } from "../../components/common/Selector";
import { MediaQueryUser } from "../../components/common/MediaQuery";
import {
  useAppColorMode,
  useGoogleUser,
  useNotifications,
  useProfileUser,
} from "../../hooks";
import auth from "../../services/auth";

interface Props {
  user: MediaQueryUser | null | undefined;
}

const UserButton = ({ user }: Props) => {
  const { combinedUser, googleUser, userSignIn, userSignOut } = useGoogleUser();
  const { profileUser } = useProfileUser();
  const [controls, setControls] = useState<Item[]>([]);
  const [showLogoutPrompt, setShowLogoutPrompt] = useState(false);
  const { count } = useNotifications();
  const { isDarkMode, toggleColorMode } = useAppColorMode();
  const navigate = useNavigate();
  const showNotificationBadge = useBreakpointValue({
    base: true,
    md: true,
    lg: false,
  });

  useEffect(() => {
    initAuthControls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id, isDarkMode, controls.length, googleUser]);

  const { name }: MediaQueryUser = user || empty.user;

  const handleViewProfile = async () => {
    if (user) navigate(`/profile/${profileUser?._id || user._id}`);
  };

  function initAuthControls() {
    const notificationItem: Item = {
      _id: "",
      label: "Notifications",
      icon: <BiBell size={20} />,
      route: "/notifications",
      rightIcon: <Badge borderRadius="full">{count}</Badge>,
    };

    const signOutItem: Item = {
      _id: "",
      label: "Sign Out",
      icon: <AiOutlineLogout />,
      onClick: () => setShowLogoutPrompt(true),
    };

    const signInItem: Item = {
      _id: "",
      label: "Google In",
      icon: <AiOutlineLogin />,
      rightIcon: <BsGoogle />,
      onClick: () => userSignIn(),
    };

    let controls =
      user || googleUser
        ? [
            {
              _id: combinedUser._id,
              label: combinedUser.name,
              onClick: () => handleViewProfile(),
              icon: <BiUser />,
            },
            notificationItem,
            signOutItem,
          ]
        : [signInItem];

    if (!googleUser && user)
      controls = [
        ...controls,
        {
          _id: "",
          label: "Enable Fast Login",
          icon: <BsGoogle />,
          onClick: () => userSignIn(),
        },
      ];

    setControls([...controls, ...getControls(user, isDarkMode)]);
  }

  const handleSelection = ({ route, onClick }: Item) => {
    if (route) return navigate(route);

    if (onClick) return onClick();

    toggleColorMode();
  };

  const handleLogout = async () => {
    if (!googleUser) {
      toast.info("Add your google account to avoid losing your information");
      return await userSignIn();
    }
    auth.logout();
    userSignOut();
    setShowLogoutPrompt(false);
    window.location.href = "/";
  };

  const handleModalClose = () => setShowLogoutPrompt(false);

  const UserAvatar = () => {
    if (!name && !googleUser)
      return (
        <IconButton
          size="sm"
          borderRadius="full"
          icon={<FaUserPlus name={name} />}
          aria-label="user-button"
        />
      );

    return (
      <Avatar
        name={name || googleUser?.displayName || ""}
        size="sm"
        src={profileUser?.avatar || googleUser?.photoURL || ""}
      />
    );
  };

  return (
    <>
      <Modal
        content={`Are you sure you want to sign out?`}
        isOpen={showLogoutPrompt}
        onModalClose={handleModalClose}
        title="Signing Out ..."
        primaryBtnLabel="I'm Sure"
        secondaryBtnLabel="Not Now"
        onPrimaryClick={handleLogout}
        onSecondaryClick={handleModalClose}
      />
      <MenuContent
        Button={
          <IconWithBadge
            Icon={<UserAvatar />}
            showBadge={showNotificationBadge}
          />
        }
        data={controls}
        onSelectItem={handleSelection}
      />
    </>
  );
};

export default UserButton;
