import { useContext } from "react";

import BagContext from "../contexts/BagContext";

const useBag = () => useContext(BagContext);

export default useBag;
