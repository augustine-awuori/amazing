import { createContext } from "react";

import { Poster } from "../pages/PostersPage";

interface PostersContextValue {
  posters: Poster[];
  setPosters: (posters: Poster[]) => void;
}

export const PostersContext = createContext<PostersContextValue>({
  posters: [],
  setPosters: () => {},
});

PostersContext.displayName = "Posters Context";

export default PostersContext;
