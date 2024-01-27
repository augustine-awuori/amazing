import { useContext } from "react";

import { Category } from "./useCategories";
import { MediaQueryUser } from "../components/common/MediaQuery";
import { OtherAccounts } from "./useUser";
import ListingContext from "../contexts/ListingContext";

export interface ListingBase {
  description: string;
  title: string;
}

export interface NewListingInfo extends ListingBase {
  images: string[];
  price: string | number;
  category: string;
}

export interface ListingInfo extends ListingBase {
  _id: string | undefined;
  author: string | undefined;
  category: string | undefined;
  images?: string[];
  price: number | string;
}

interface Author extends MediaQueryUser {
  otherAccounts?: OtherAccounts;
}

export interface Listing extends ListingBase {
  _id: string;
  category: Category;
  author: Author;
  images: string[];
  timestamp: number;
  price: number | undefined;
}

const useListing = () => useContext(ListingContext);

export default useListing;
