import { AiFillEdit, AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { BiUser } from "react-icons/bi";

import { Avatar, ColorSwitchMode } from "../components";
import { Item } from "../components/common/Selector";
import { MediaQueryUser } from "../components/common/MediaQuery";

export function getControls(
  user: MediaQueryUser | null | undefined,
  isDarkMode: boolean
): Item[] {
  const controls = user?._id
    ? [
        {
          _id: "",
          icon: <BiUser />,
          rightIcon: <Avatar name={user.name} size="xs" src={user.avatar} />,
          label: user.name,
          route: `/profile/${user._id}`,
        },
        {
          _id: "",
          icon: <AiOutlineLogout />,
          label: "Sign Out",
          route: "/logout",
        },
      ]
    : [
        {
          _id: "",
          icon: <AiOutlineLogin />,
          label: "Sign In",
          route: "/login",
        },
        {
          _id: "",
          icon: <AiFillEdit />,
          label: "Sign Up",
          route: "/register",
        },
      ];

  return [
    ...controls,
    {
      _id: "",
      icon: isDarkMode ? <MoonIcon /> : <SunIcon />,
      label: isDarkMode ? "Dark Mode" : "Light Mode",
      rightIcon: <ColorSwitchMode />,
    },
  ];
}
