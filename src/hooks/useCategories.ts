import { Item } from "../components/common/Selector";
import { endpoint } from "../services/categories";
import useData from "./useData";

export interface Category extends Item {}

const useCategories = () => {
  const { data, error, isLoading } = useData<Category>(endpoint);

  return {
    categories: [{ _id: "", label: "All" }, ...data],
    error,
    isLoading,
  };
};

export default useCategories;
