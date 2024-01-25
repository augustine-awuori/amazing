import { useContext, useEffect } from "react";
import { toast } from "react-toastify";

import { endpoint } from "../services/listings";
import { Listing } from "./useListing";
import ListingsContext from "../contexts/ListingsContext";
import service from "../services/listings";
import storage from "../utils/storage";
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
    let found: Listing | undefined;
    const prevListings = [...data];

    setListings(
      data.filter((listing) => {
        if (listing._id === listingId) found = listing;

        return listing._id !== listingId;
      })
    );

    const { ok } = await service.deleteListing(listingId);
    if (ok) {
      if (found) storage.deleteImages(found.images);
      return toast.done("Listing deleted successfully");
    }

    setListings(prevListings);
    toast.error("Listing deletion failed!");
  };

  const addListing = (listing: Listing) => setListings([listing, ...data]);

  const convertToShopProduct = (listingId: string, shopId: string) =>
    service.convertToShopProduct(listingId, shopId);

  return {
    addListing,
    convertToShopProduct,
    data,
    deleteListing,
    error,
    isLoading,
    updateListing,
  };
};

export default useListings;
