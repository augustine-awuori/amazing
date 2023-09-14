import { Item } from "../components/common/Selector";
import { endpoint } from "../services/categories";
import useData from "./useData";

export interface Category extends Item {}

const useCategories = () => {
  const { data, error, isLoading } = useData<Category>(endpoint);

  return {
    data: [{ _id: "", label: "All Categories" }, ...data],
    error,
    isLoading,
  };
};

export default useCategories;
