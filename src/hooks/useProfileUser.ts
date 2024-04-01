import { useContext } from "react";

import ProfileUserContext from "../contexts/ProfileUserContext";

export default function useProfileUser() {
  const { profileUser, setProfileUser } = useContext(ProfileUserContext);

  return { profileUser, setProfileUser };
}
