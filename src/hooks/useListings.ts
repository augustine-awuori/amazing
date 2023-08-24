import { Listing } from "./useListing";
import useData from "./useData";

import { endpoint } from "../services/listings";

const useListings = () => useData<Listing>(endpoint);

export default useListings;
