import { createContext } from "react";

import { Request } from "../hooks/useRequest";

interface ContextValue {
  request: Request | undefined;
  setRequest: (request: Request) => void;
}

export const RequestContext = createContext<ContextValue>({
  request: undefined,
  setRequest: () => {},
});

RequestContext.displayName = "Request Context";

export default RequestContext;
