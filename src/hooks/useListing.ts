import { useContext } from "react";
import { Category } from "./useCategories";

import ListingContext from "../context/ListingContext";
import { User } from "./useUser";

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
