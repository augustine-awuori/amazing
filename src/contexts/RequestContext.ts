import React from "react";

import { Request } from "../hooks/useRequest";

interface RequestContextValue {
  request: Request | undefined;
  setRequest: (request: Request) => void;
}

export const RequestContext = React.createContext<RequestContextValue>({
  request: undefined,
  setRequest: () => {},
});

RequestContext.displayName = "Request Context";

export default RequestContext;
