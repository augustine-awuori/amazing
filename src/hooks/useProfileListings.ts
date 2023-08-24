import { useContext, useEffect, useState } from "react";

import listingsApi from "../services/listings";
import ProfileListingsContext from "../contexts/ProfileListingsContext";
import { Listing } from "./useListing";

interface ApiResponse<T> {
  data: T;
  ok: boolean;
  problem: string;
}

const useProfileListings = (userId: string | undefined) => {
  const context = useContext(ProfileListingsContext);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const profileListings = context.profileListings || [];
  const setProfileListings = context.setProfileListings;

  useEffect(() => {
    getListings();
  }, [userId]);

  const getListings = async () => {
    if (userId) {
      setLoading(true);
      const response = (await listingsApi.getUserListings(
        userId
      )) as ApiResponse<Listing[]>;
      setLoading(false);

      if (response.ok) {
        setProfileListings?.(response.data);
      } else {
        setError(response.problem);
      }
    }
  };

  return {
    count: profileListings.length,
    error,
    isLoading,
    listings: profileListings,
  };
};

export default useProfileListings;
