import { createContext } from "react";

import { Status } from "../hooks/useStatus";

interface StatusContextValue {
  status: Status[];
  setStatus: (status: Status[]) => void;
}

export const StatusContext = createContext<StatusContextValue>({
  status: [],
  setStatus: () => {},
});

StatusContext.displayName = "Status Context";

export default StatusContext;
