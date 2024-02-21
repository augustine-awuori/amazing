import { useContext, useEffect } from "react";
import { toast } from "react-toastify";

import { DataError } from "../services/client";
import { endpoint } from "../services/posters";
import { Poster } from "../Pages/PostersPage";
import PostersContext from "../contexts/PostersContext";
import service from "../services/posters";
import useData from "./useData";

const usePosters = () => {
  const { data: posters, ...rest } = useData<Poster>(endpoint);
  const { setPosters } = useContext(PostersContext);

  useEffect(() => {
    setPosters(posters?.length ? posters : []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posters?.length]);

  const addPoster = async (poster: Poster) => {
    const res = await service.savePoster(poster);

    if (res.ok) {
      toast.success("Poster created successfully!");
      setPosters([res.data as Poster, ...posters]);
    } else
      toast.error(
        (res.data as DataError).error || "Poster couldn't be created"
      );

    return res;
  };

  return { addPoster, posters, ...rest };
};

export default usePosters;
