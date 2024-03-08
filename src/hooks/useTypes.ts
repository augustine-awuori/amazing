import { endpoint } from "../services/types";
import { Item } from "../components/common/Selector";
import useData from "./useData";

export interface Type extends Item {}

const useTypes = () => {
  const { data, error, isLoading } = useData<Type>(endpoint);

  return {
    types: [{ _id: "", label: "All" }, ...data],
    error,
    isLoading,
  };
};

export default useTypes;
