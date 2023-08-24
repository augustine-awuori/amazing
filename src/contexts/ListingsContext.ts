import React from "react";

import { Listing } from "../hooks/useListing";

interface ListingsContextValue {
  listings: Listing[] | undefined;
  setListings: (listings: Listing[]) => void;
}

export const ListingsContext = React.createContext<ListingsContextValue>({
  listings: [],
  setListings: () => {},
});

ListingsContext.displayName = "Listings Context";

export default ListingsContext;
