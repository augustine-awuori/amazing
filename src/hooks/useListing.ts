import { useContext } from "react";

import { Category } from "./useCategories";
import { User } from "./useUser";
import ListingContext from "../contexts/ListingContext";

export interface ListingInfo {
  _id: string;
  authorId: string;
  category: Category;
  description: string;
  title: string;
  price: number;
  subTitle: string;
}

export interface Listing {
  _id: string;
  author: User;
  category: Category;
  description: string;
  images: string[];
  price: number;
  subTitle: string;
  timestamp: number;
  title: string;
}

const useListing = () => {
  const context = useContext(ListingContext);

  const listing: Listing = context?.listing;
  const setListing = context?.setListing;

  return { listing, setListing };
};

export default useListing;
