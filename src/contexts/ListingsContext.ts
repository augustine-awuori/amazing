import { createContext } from "react";

import { Listing } from "../hooks/useListing";

interface ListingsContextValue {
  listings: Listing[] | undefined;
  setListings: (listings: Listing[]) => void;
}

export const ListingsContext = createContext<ListingsContextValue>({
  listings: [],
  setListings: () => {},
});

ListingsContext.displayName = "Listings Context";

export default ListingsContext;
