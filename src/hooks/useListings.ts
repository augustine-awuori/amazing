import { useContext, useEffect } from "react";

import { endpoint } from "../services/listings";
import { Listing } from "./useListing";
import { ListingsContext } from "../contexts";
import useData from "./useData";

const useListings = () => {
  const { data, error, isLoading } = useData<Listing>(endpoint);
  const { setListings } = useContext(ListingsContext);

  useEffect(() => {
    setListings(data);
  }, []);

  const updateListing = (listing: Listing) =>
    setListings(
      data.map((l) => {
        if (l._id === listing._id) l = listing;

        return l;
      })
    );

  return { data, error, isLoading, updateListing };
};

export default useListings;
