import React from "react";

import { Listing } from "../hooks/useListing";

interface ListingContextValue {
  listing: Listing | undefined;
  setListing: (listing: Listing) => void;
}

export const ListingContext = React.createContext<ListingContextValue>({
  listing: undefined,
  setListing: () => {},
});

ListingContext.displayName = "Listing Context";

export default ListingContext;
