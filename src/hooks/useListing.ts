import { useContext } from "react";
import { Category } from "./useCategories";

import ListingContext from "../context/ListingContext";
import { User } from "./useUser";

export interface Listing {
  _id: string;
  author: User;
  category: Category;
  description: string;
  title: string;
  subTitle: string;
  images: string[];
  price: number;
}

const useListing = () => {
  const context = useContext(ListingContext);

  const listing: Listing = context?.listing;
  const setListing = context?.setListing;

  return { listing, setListing };
};

export default useListing;
