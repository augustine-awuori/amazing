import { createContext } from "react";

import { Request } from "../hooks/useRequest";

interface ProfileRequestsContextValue {
  profileRequests: Request[] | undefined;
  setProfileRequests: (requests: Request[]) => void;
}

export const ProfileRequestsContext =
  createContext<ProfileRequestsContextValue>({
    profileRequests: [],
    setProfileRequests: () => {},
  });

ProfileRequestsContext.displayName = "Profile Requests Context";

export default ProfileRequestsContext;
