import { AiFillEdit, AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";

import { Avatar } from "../components";
import { Item } from "../components/common/Selector";
import { MediaQueryUser } from "../components/common/MediaQuery";

export interface ControlItem extends Item {
  icon: JSX.Element;
  route: string;
}

export function getControls(
  user: MediaQueryUser | null | undefined
): ControlItem[] {
  return user?._id
    ? [
        {
          _id: "",
          icon: <Avatar name={user.name} size="xs" src={user.avatar} />,
          label: user.name,
          route: `/profile/${user._id}`,
        },
        {
          _id: "",
          icon: <AiOutlineLogout />,
          label: "Logout",
          route: "/logout",
        },
      ]
    : [
        {
          _id: "",
          icon: <AiOutlineLogin />,
          label: "Login",
          route: "/login",
        },
        {
          _id: "",
          icon: <AiFillEdit />,
          label: "Register",
          route: "/register",
        },
      ];
}
