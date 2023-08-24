import { useEffect, useState } from "react";
import { AxiosRequestConfig, CanceledError } from "axios";
import { ApiResponse } from "apisauce";

import apiClient from "../services/client";

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: any[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();

      setLoading(true);
      apiClient
        .get(endpoint, {
          signal: controller.signal,
          ...requestConfig,
        })
        .then((res: ApiResponse<any, any>) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (!(err instanceof CanceledError)) {
            setError(err.message);
            setLoading(false);
          }
        });

      return () => controller.abort();
    },
    deps ? [...deps] : []
  );

  return { data: data || [], error, isLoading };
};

export default useData;
