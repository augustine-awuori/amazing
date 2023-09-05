import React from "react";

interface LayoutContextValue {
  baseColumn: string;
  setBaseColumn: (column: string) => void;
}

export const LayoutContext = React.createContext<LayoutContextValue>({
  baseColumn: "1fr",
  setBaseColumn: () => {},
});

LayoutContext.displayName = "Layout Context";

export default LayoutContext;
