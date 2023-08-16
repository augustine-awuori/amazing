import useData from "./useData";

export interface Category {
  _id: string;
  label: string;
}

const useCategories = () => {
  const { data, error, isLoading } = useData<Category>("/categories");

  return {
    data: [{ _id: "", label: "All Categories" }, ...data],
    error,
    isLoading,
  };
};

export default useCategories;
