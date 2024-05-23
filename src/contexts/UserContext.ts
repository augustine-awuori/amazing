import { createContext } from "react";

import { User } from "../hooks/useUser";

export interface UserContextValue {
  user: User | undefined;
  setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextValue>({
  user: undefined,
  setUser: () => {},
});

UserContext.displayName = "User Context";

export default UserContext;
