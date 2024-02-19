import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { DataError, getCacheData } from "../services/client";
import { endpoint } from "../services/requests";
import { Request } from "./useRequest";
import RequestsContext from "../contexts/RequestsContext";
import requestsService from "../services/requests";
import useData from "./useData";

const useRequests = () => {
  const { data, error, ...rest } = useData<Request>(endpoint);
  const context = useContext(RequestsContext);
  const [isLoading, setLoading] = useState(true);

  const requests = context?.requests || data || [];
  const setRequests = context?.setRequests;

  useEffect(() => {
    rest.isLoading ? preLoadRequests() : initRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.length]);

  function initRequests() {
    setLoading(true);
    setRequests(data);
    setLoading(false);
  }

  async function preLoadRequests() {
    setLoading(true);
    setRequests(await getCacheData<Request>(endpoint));
    setLoading(false);
  }

  const addRequest = (request: Request) => setRequests([request, ...requests]);

  const updateRequest = (request: Request) =>
    setRequests(requests.map((r) => (r._id === request._id ? request : r)));

  const deleteRequest = async (requestId: string) => {
    const oldRequests = [...requests];
    setRequests(requests.filter((r) => r._id !== requestId));

    const { data, ok, problem } = await requestsService.deleteRequest(
      requestId
    );

    if (!ok) {
      toast.error((data as DataError)?.error || problem);
      return setRequests(oldRequests);
    }
  };

  return {
    addRequest,
    data,
    deleteRequest,
    error,
    requests,
    updateRequest,
    isLoading,
  };
};

export default useRequests;
