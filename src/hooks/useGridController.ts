import { useContext } from "react";

import ColumnContext from "../contexts/ColumnContext";

export default () => {
  const { column, setColumn } = useContext(ColumnContext);

  const resetGrid = () => setColumn("170px");

  const removeAsideGrid = () => setColumn("");

  return { column, removeAsideGrid, resetGrid };
};
