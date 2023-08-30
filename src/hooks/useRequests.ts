import { useContext, useEffect } from "react";

import { endpoint } from "../services/requests";
import { Request } from "./useRequest";
import RequestsContext from "../contexts/RequestsContext";
import useData from "./useData";

const useRequests = () => {
  const { data, error, isLoading } = useData<Request>(endpoint);
  const context = useContext(RequestsContext);

  const requests = context?.requests || data || [];
  const setRequests = context?.setRequests;

  useEffect(() => {
    setRequests(data);
  }, [data?.length]);

  const addRequest = (request: Request) => setRequests([request, ...requests]);

  //   const getMyRequests = async (userId:string) => {
  //     const { data, ok } = await requestsApi.getMy(userId);
  //     if (ok) setMyRequests(data);
  //   };

  const updateRequest = (request: Request) =>
    setRequests(requests.map((r) => (r._id === request._id ? request : r)));

  //   const getRequest = async (requestId: string) =>
  //     await requestsApi.getRequest(requestId);

  //   const deleteRequest = async (requestId: string) => {
  //     const { data, ok, problem } = await requestsApi.deleteRequest(requestId);
  //     if (!ok)
  //       return alert(
  //         "Request Deletion Failed!",
  //         data?.error || problem,
  //         "got it"
  //       );

  //     setRequests([...requests].filter((r) => r._id !== requestId));
  //   };

  //   const updateAuthorRequests = (author) => {
  //     const requests = [...data].map((request) => {
  //       if (request.author._id === author._id) request.author = author;

  //       return request;
  //     });

  //     setRequests(requests);
  //   };

  return {
    addRequest,
    data,
    // count,
    // deleteRequest,
    error,
    // getMyRequests,
    // getRequest,
    // loading,
    // myRequests,
    // myRequestsCount: myRequests.length,
    requests,
    updateRequest,
    // updateAuthorRequests,
    isLoading,
  };
};

export default useRequests;
