import useData from "./useData";

export interface Category {
  _id: string;
  label: string;
}

const useCategories = () => useData<Category>("/categories");

export default useCategories;
