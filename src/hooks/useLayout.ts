import { useContext } from "react";

import LayoutContext from "../contexts/LayoutContext";

const useLayout = () => {
  const { baseColumn, setBaseColumn } = useContext(LayoutContext);

  const changeColumnToScreenWidth = () => setBaseColumn("100%");

  const revertColumn = () => setBaseColumn("1fr");

  return { baseColumn, changeColumnToScreenWidth, revertColumn };
};

export default useLayout;
