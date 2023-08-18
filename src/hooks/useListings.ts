import { Listing } from "./useListing";
import useData from "./useData";

const useListing = () => useData<Listing>("/listings");

export default useListing;
