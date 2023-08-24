import React from "react";

import { Listing } from "../hooks/useListing";

interface ProfileListingsContextValue {
  profileListings: Listing[] | undefined;
  setProfileListings: (listings: Listing[]) => void;
}

export const ProfileListingsContext =
  React.createContext<ProfileListingsContextValue>({
    profileListings: [],
    setProfileListings: () => {},
  });

ProfileListingsContext.displayName = "Profile Listings Context";

export default ProfileListingsContext;
