import { useState } from "react";
import { ApiResponse } from "apisauce";
import { useParams } from "react-router-dom";

export default function useReload(
  prevInfo: any,
  infoStructure: any,
  apiFunc: (id: string) => Promise<ApiResponse<any, any>>
) {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);
  const params = useParams();

  const request = async () => {
    if (prevInfo) return;

    const id = params[infoStructure.paramsId];
    if (!id) return (window.location = "/");

    try {
      setLoading(true);
      const { data } = await apiFunc(id);
      setLoading(false);
      setData(data);
    } catch (error) {
      window.location = "/";
    } finally {
      setLoading(false);
    }
  };

  const info = prevInfo || data || infoStructure;

  return { info, isLoading, request };
}
