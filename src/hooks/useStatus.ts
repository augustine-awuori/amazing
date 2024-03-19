import { useContext, useEffect } from "react";

import { endpoint } from "../services/status";
import { StatusContext } from "../contexts";
import useData from "./useData";

export interface Status {
  _id: string;
  color: string;
  label: string;
}

const useStatus = () => {
  const { status, setStatus } = useContext(StatusContext);
  const { data, error, isLoading } = useData<Status>(endpoint);

  useEffect(() => {
    if (!error) setStatus(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.length]);

  return { status: [{ _id: "", label: "All" }, ...status], error, isLoading };
};

export default useStatus;
