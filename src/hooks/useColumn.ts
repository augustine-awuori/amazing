import { useContext } from "react";

import ColumnContext from "../contexts/ColumnContext";

export default () => {
  const context = useContext(ColumnContext);

  const resetColumn = () => context.setColumn("170px");

  return { ...context, resetColumn };
};
