import React from "react";

import { User } from "../hooks/useUser";

interface ProfileUserContextValue {
  profileUser: User | undefined;
  setProfileUser: (user: User) => void;
}

const defaultValue: ProfileUserContextValue = {
  profileUser: undefined,
  setProfileUser: () => {},
};

export const ProfileUserContext =
  React.createContext<ProfileUserContextValue>(defaultValue);

ProfileUserContext.displayName = "Profile User Context";

export default ProfileUserContext;
