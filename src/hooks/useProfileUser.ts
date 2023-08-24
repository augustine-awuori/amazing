import { useContext } from "react";

import { User } from "./useUser";
import ProfileUserContext from "../contexts/ProfileUserContext";

export default function useRequest() {
  const context = useContext(ProfileUserContext);

  const profileUser: User = context?.profileUser;
  const setProfileUser = context?.setProfileUser;

  return { profileUser, setProfileUser };
}
