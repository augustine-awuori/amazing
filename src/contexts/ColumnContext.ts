import { createContext } from "react";

interface ContextValue {
  column: string;
  setColumn: (column: string) => void;
}

const ColumnContext = createContext<ContextValue>({
  column: "",
  setColumn: () => {},
});

ColumnContext.displayName = "Column Context";

export default ColumnContext;
