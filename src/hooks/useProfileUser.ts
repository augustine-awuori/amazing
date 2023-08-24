import { useContext } from "react";

import ProfileUserContext from "../contexts/ProfileUserContext";

export default function useRequest() {
  const context = useContext(ProfileUserContext);

  const profileUser = context.profileUser;
  const setProfileUser = context.setProfileUser;

  return { profileUser, setProfileUser };
}
