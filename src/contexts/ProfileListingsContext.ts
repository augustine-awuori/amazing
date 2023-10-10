import { createContext } from "react";

import { Listing } from "../hooks/useListing";

interface ContextValue {
  profileListings: Listing[] | undefined;
  setProfileListings: (listings: Listing[]) => void;
}

export const ProfileListingsContext = createContext<ContextValue>({
  profileListings: [],
  setProfileListings: () => {},
});

ProfileListingsContext.displayName = "Profile Listings Context";

export default ProfileListingsContext;
