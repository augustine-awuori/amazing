import { useState } from "react";

import { Button } from ".";
import { ImageInputList } from "./common";
import { useAppColorMode, useImages, usePosters } from "../hooks";
import storage from "../utils/storage";

const NewPosterForm = ({ onDone }: { onDone: () => void }) => {
  const [error, setError] = useState("");
  const { images, imagesCount } = useImages(1);

  const helper = usePosters();
  const [loading, setLoading] = useState(false);
  const { accentColor, concAccentColor } = useAppColorMode();

  const doSubmit = async () => {
    if (error) setError("");
    setLoading(true);
    if (!imagesCount) return setError("Please select an image");

    const image = await storage.saveImage(images[0]);
    if (!image) return setError("Image couldn't be saved");
    const res = await helper.addPoster({ image });
    setLoading(false);

    if (res.ok) onDone();
    else {
      setError("Poster couldn't be created");
      await storage.deleteImage(image);
    }
  };

  return (
    <>
      <ImageInputList imagesLimit={1} />
      <Button
        onClick={doSubmit}
        bg={accentColor}
        isLoading={loading}
        _hover={{ bg: concAccentColor }}
      >
        Save Poster
      </Button>
    </>
  );
};

export default NewPosterForm;
