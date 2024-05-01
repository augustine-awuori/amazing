import { Dispatch, SetStateAction, createContext } from "react";

interface ImagesContextType {
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
}

const ImagesContext = createContext<ImagesContextType>({
  images: [],
  setImages: () => {},
});

ImagesContext.displayName = "Images Context";

export default ImagesContext;
