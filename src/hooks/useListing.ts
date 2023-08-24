import { useContext } from "react";

import { Category } from "./useCategories";
import { User } from "./useUser";
import ListingContext from "../contexts/ListingContext";

export interface ListingBase {
  _id: string;
  category: Category;
  description: string;
  price: number | undefined;
  title: string;
  subTitle: string;
}

export interface ListingInfo extends ListingBase {
  authorId: string;
}

export interface Listing extends ListingBase {
  author: User;
  images: string[];
  timestamp: number;
}

const useListing = () => {
  const context = useContext(ListingContext);

  const listing = context?.listing;
  const setListing = context?.setListing;

  return { listing, setListing };
};

export default useListing;
