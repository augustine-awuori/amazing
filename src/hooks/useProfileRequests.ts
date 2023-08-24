import { useContext, useEffect, useState } from "react";

import ProfileRequestsContext from "../contexts/ProfileRequestsContext";
import requestsApi from "../services/requests";

const useProfileRequests = (userId: string) => {
  const context = useContext(ProfileRequestsContext);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const profileRequests = context?.profileRequests || [];
  const setProfileRequests = context?.setProfileRequests;

  useEffect(() => {
    getRequests();
  }, [userId]);

  const getRequests = async () => {
    if (userId) {
      setLoading(true);
      const { data, ok, problem } = await requestsApi.getUserRequests(userId);
      setLoading(false);
      if (ok) setProfileRequests(data);
      else setError(data?.error || problem);
    }
  };

  return {
    count: profileRequests.length,
    error,
    isLoading,
    requests: profileRequests,
  };
};

export default useProfileRequests;
