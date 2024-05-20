import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaShieldAlt, FaUserCheck } from "react-icons/fa";

import { addObjectAtIndex } from "../utils/format";
import { ColorSwitchMode } from "../components";
import { Item } from "../components/common/Selector";
import { MediaQueryUser } from "../components/common/MediaQuery";

export function getControls(
  user: MediaQueryUser | null | undefined,
  isDarkMode: boolean
): Item[] {
  const controls = [
    {
      _id: "",
      icon: isDarkMode ? <MoonIcon /> : <SunIcon />,
      label: isDarkMode ? "Dark Mode" : "Light Mode",
      rightIcon: <ColorSwitchMode />,
    },
  ];

  const adminControl = {
    _id: "",
    label: "Admin View",
    icon: <FaShieldAlt />,
    route: "/admin",
    rightIcon: <FaUserCheck />,
  };

  return user?.isAdmin
    ? addObjectAtIndex<Item>(controls, 1, adminControl)
    : controls;
}
