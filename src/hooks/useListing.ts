import { useContext } from "react";

import { Category } from "./useCategories";
import { User } from "./useUser";
import ListingContext from "../contexts/ListingContext";

export interface ListingBase {
  description: string;
  title: string;
}

export interface ListingInfo extends ListingBase {
  _id: string | undefined;
  authorId: string | undefined;
  categoryId: string | undefined;
  price: number | string;
}

export interface Listing extends ListingBase {
  _id: string;
  category: Category;
  author: User;
  images: string[];
  timestamp: number;
  price: number | undefined;
}

const useListing = () => {
  const context = useContext(ListingContext);

  const listing = context?.listing;
  const setListing = context?.setListing;

  return { listing, setListing };
};

export default useListing;
