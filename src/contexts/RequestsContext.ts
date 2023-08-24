import React from "react";

import { Request } from "../hooks/useRequest";

interface RequestsContextValue {
  requests: Request[] | undefined;
  setRequests: (requests: Request[]) => void;
}

export const RequestsContext = React.createContext<RequestsContextValue>({
  requests: [],
  setRequests: () => {},
});

RequestsContext.displayName = "Requests Context";

export default RequestsContext;
