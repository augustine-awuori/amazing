import React from "react";

import { User } from "../hooks/useUser";

interface ProfileUserContextValue {
  profileUser: User | undefined;
  setProfileUser: (user: User) => void;
}

export const ProfileUserContext = React.createContext<ProfileUserContextValue>({
  profileUser: undefined,
  setProfileUser: () => {},
});

ProfileUserContext.displayName = "Profile User Context";

export default ProfileUserContext;
