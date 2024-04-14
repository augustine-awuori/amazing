import { endpoint } from "../services/types";
import { Item } from "../components/common/Selector";
import useData from "./useData";

export interface ProductType extends Item {}

const useProductTypes = () => {
  const { data, error, isLoading } = useData<ProductType>(endpoint);

  return {
    types: [{ _id: "", label: "All" }, ...data],
    error,
    isLoading,
  };
};

export default useProductTypes;
