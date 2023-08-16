import { Category } from "./useCategories";
import useData from "./useData";

interface Author {
  _id: string;
  name: string;
  username: string;
  avatar?: string;
}

export interface Listing {
  _id: string;
  author: Author;
  category: Category;
  title: string;
  subTitle: string;
  images: string[];
}

const useListing = () => useData<Listing>("/listings");

export default useListing;
