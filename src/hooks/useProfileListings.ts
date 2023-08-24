import { useContext, useEffect, useState } from "react";

import listingsApi from "../services/listings";
import ProfileListingsContext from "../contexts/ProfileListingsContext";

const useProfileListings = (userId: string) => {
  const context = useContext(ProfileListingsContext);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const profileListings = context?.profileListings || [];
  const setProfileListings = context?.setProfileListings;

  useEffect(() => {
    getListings();
  }, [userId]);

  const getListings = async () => {
    if (userId) {
      setLoading(true);
      const { data, ok, problem } = await listingsApi.getUserListings(userId);
      setLoading(false);
      if (ok) setProfileListings(data);
      else setError(data?.error || problem);
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
