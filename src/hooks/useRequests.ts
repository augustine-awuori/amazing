import useData from "./useData";
import { Request } from "./useRequest";

const useRequests = () => useData<Request>("/requests");

export default useRequests;
