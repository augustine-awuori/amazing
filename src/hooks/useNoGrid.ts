import { useEffect } from "react";

import useGridController from "./useGridController";

const useNoGrid = () => {
  const { removeAsideGrid, resetGrid } = useGridController();

  useEffect(() => {
    removeAsideGrid();

    return () => resetGrid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useNoGrid;
