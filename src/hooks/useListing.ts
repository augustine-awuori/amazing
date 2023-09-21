import { useContext } from "react";
import { z } from "zod";

import { Category } from "./useCategories";
import { User } from "./useUser";
import ListingContext from "../contexts/ListingContext";

export interface ListingBase {
  description: string;
  title: string;
}

export interface NewListingInfo {
  images: File[];
  title: string;
  description: string;
  price: string | number;
  category: string;
}

export interface ListingInfo extends ListingBase {
  _id: string | undefined;
  author: string | undefined;
  category: string | undefined;
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

export const schema = z.object({
  title: z
    .string()
    .min(1, "Title should be between 1 and 50 characters")
    .max(50),
  price: z
    .string()
    .min(1, "Price should be between Ksh 1 and  Ksh 1M")
    .max(1_000_000),
  description: z.string(),
  category: z.string().min(5),
});

const useListing = () => {
  const context = useContext(ListingContext);

  const listing = context?.listing;
  const setListing = context?.setListing;

  return { listing, setListing };
};

export default useListing;
