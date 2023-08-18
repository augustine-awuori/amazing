import { Listing } from "./useListing";
import useData from "./useData";

const useListings = () => useData<Listing>("/listings");

export default useListings;
