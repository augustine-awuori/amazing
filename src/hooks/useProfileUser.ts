import { useContext } from "react";

import { ProfileEditFormData } from "../data/schemas";
import { UpdatableUserInfo } from "./useUser";
import ProfileUserContext from "../contexts/ProfileUserContext";

export default function useProfileUser() {
  const { profileUser, setProfileUser } = useContext(ProfileUserContext);

  function getChangedInfo(info: ProfileEditFormData): UpdatableUserInfo {
    const { name, username, instagram, twitter, whatsapp, youtube } = info;
    const updated: UpdatableUserInfo = {};
    if (!profileUser) return updated;

    const accounts = profileUser.otherAccounts;
    if (profileUser.name !== name) updated.name = name;
    if (profileUser.username !== username) updated.username = username;
    if (accounts.instagram !== instagram) updated.instagram = instagram;
    if (accounts.twitter !== twitter) updated.twitter = twitter;
    if (accounts.whatsapp !== whatsapp) updated.whatsapp = whatsapp;
    if (accounts.youtube !== youtube) updated.youtube = youtube;

    return updated;
  }

  return { profileUser, getChangedInfo, setProfileUser };
}
