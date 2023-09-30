import { useContext, useEffect } from "react";
import { toast } from "react-toastify";

import { endpoint } from "../services/listings";
import { Listing } from "./useListing";
import ListingsContext from "../contexts/ListingsContext";
import listingsService from "../services/listings";
import useData from "./useData";

const useListings = () => {
  const { data, error, isLoading } = useData<Listing>(endpoint);
  const { setListings } = useContext(ListingsContext);

  useEffect(() => {
    setListings(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateListing = (listing: Listing) =>
    setListings(
      data.map((l) => {
        if (l._id === listing._id) l = listing;

        return l;
      })
    );

  const deleteListing = async (listingId: string | undefined) => {
    if (!listingId) return;
    const prevListings = [...data];
    setListings(data.filter((listing) => listing._id !== listingId));

    const { ok } = await listingsService.deleteListing(listingId);

    if (ok) return toast.done("Listing deleted successfully");
    setListings(prevListings);
    toast.error("Listing deletion failed!");
  };

  const addListing = (listing: Listing) => setListings([listing, ...data]);

  return { addListing, data, deleteListing, error, isLoading, updateListing };
};

export default useListings;
