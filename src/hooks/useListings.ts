import { Listing } from "./useListing";
import useData from "./useData";

import listingsApi, { endpoint } from "../services/listings";

const useListings = () => {
  const { data, error, isLoading } = useData<Listing>(endpoint);

  return { data, error, isLoading };
};

export default useListings;
