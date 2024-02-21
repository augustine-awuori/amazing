import { useState } from "react";
import { z } from "zod";

import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
  TextAreaField,
} from "./form";
import { ImageInputList } from "./common";
import { useForm, useImages, usePosters } from "../hooks";
import storage from "../utils/storage";

const schema = z.object({
  phone: z.string().optional(),
  position: z.string().optional(),
  speech: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const NewPosterForm = ({ onDone }: { onDone: () => void }) => {
  const [error, setError] = useState("");
  const { images, imagesCount } = useImages(1);
  const { errors, handleSubmit, register } = useForm(schema);
  const helper = usePosters();
  const [loading, setLoading] = useState(false);

  const doSubmit = async (info: FormData) => {
    if (error) setError("");
    setLoading(true);
    if (!imagesCount) return setError("Please select an image");

    const image = await storage.saveImage(images[0]);
    if (!image) return setError("Image couldn't be saved");
    const res = await helper.addPoster({ ...info, image });
    setLoading(false);

    if (res.ok) onDone();
    else {
      setError("Poster couldn't be created");
      await storage.deleteImage(image);
    }
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={doSubmit}
      usePageContainer={false}
    >
      <ImageInputList imagesLimit={1} />
      <ErrorMessage error={error} />
      <FormField
        error={errors.position}
        label="Position"
        register={register}
        textTransform="capitalize"
        placeholder="Chairperson (optional)"
      />
      <FormField
        error={errors.phone}
        label="Phone"
        register={register}
        placeholder="+2547... (optional)"
      />
      <TextAreaField
        error={errors.speech}
        label="Speech"
        placeholder="What else do you have to say? (optional)"
        register={register}
      />
      <SubmitButton label="Save Poster" isLoading={loading} />
    </Form>
  );
};

export default NewPosterForm;
