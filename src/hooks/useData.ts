import { useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";
import CanceledError from "axios";

import { ApiResponse } from "apisauce";

import apiClient from "../services/client";

const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get(endpoint, {
        signal: controller.signal,
        ...requestConfig,
      })
      .then((res: ApiResponse<unknown, unknown>) => {
        setData(res.data as T[]);
        setLoading(false);
      })
      .catch((err) => {
        if (!(err instanceof CanceledError)) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  return { data: data || [], error, isLoading };
};

export default useData;
