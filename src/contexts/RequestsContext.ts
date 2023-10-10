import { createContext } from "react";

import { Request } from "../hooks/useRequest";

interface ContextValue {
  requests: Request[] | undefined;
  setRequests: (requests: Request[]) => void;
}

export const RequestsContext = createContext<ContextValue>({
  requests: [],
  setRequests: () => {},
});

RequestsContext.displayName = "Requests Context";

export default RequestsContext;
