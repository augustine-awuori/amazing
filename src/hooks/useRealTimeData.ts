import { useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";

import config from "../db/config";

const useRealTimeData = <T>(collectionName: string, id?: string) => {
  const [data, setData] = useState<T>();

  useEffect(() => {
    if (!id) return;

    const unsub = onSnapshot(doc(config.db, collectionName, id), (doc) => {
      if (doc.exists()) setData(doc.data() as T);
    });

    return () => unsub();
  }, [collectionName, id]);

  return data;
};

export default useRealTimeData;
