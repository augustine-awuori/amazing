import { useContext, useEffect, useState } from "react";

import ProfileRequestsContext from "../contexts/ProfileRequestsContext";
import { Request } from "./useRequest";
import requestsApi from "../services/requests";

interface ApiResponse<T> {
  data: T;
  ok: boolean;
  problem: string;
}

const useProfileRequests = (userId: string | undefined) => {
  const context = useContext(ProfileRequestsContext);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const profileRequests = context.profileRequests || [];
  const setProfileRequests = context.setProfileRequests;

  useEffect(() => {
    getRequests();
  }, [userId]);

  const getRequests = async () => {
    if (userId) {
      setLoading(true);
      const response = (await requestsApi.getUserRequests(
        userId
      )) as ApiResponse<Request[]>;
      setLoading(false);

      if (response.ok) {
        setProfileRequests(response.data);
      } else {
        setError(response.problem);
      }
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
