import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import {
  Form,
  FormField,
  ShopTypeSelector as Selector,
  SubmitButton,
} from "../components/form";
import { ImageInputList } from "../components/common";
import { useForm, useImages, useShops } from "../hooks";
import auth from "../services/auth";

const schema = z.object({
  name: z.string().min(3).max(50),
  type: z.string().min(2),
});

type FormData = z.infer<typeof schema>;

const MAX_IMAGES = 1;

const ShopEditPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { errors, handleSubmit, register, reset } = useForm(schema);
  const { images, imagesCount, removeAllImages } = useImages(MAX_IMAGES);
  const shops = useShops();
  const user = auth.getCurrentUser();

  const doSubmit = async (info: FormData) => {
    if (error) setError("");
    if (!imagesCount) {
      toast.error("Form is incomplete");
      return setError("Please select an image");
    }

    setLoading(true);
    const res = await shops.create({ ...info, image: images[0] });
    setLoading(false);

    if (!res.ok) return setError(res.error);
    removeAllImages();
    reset();
  };

  if (!user) return <Navigate to="/login" replace />;

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={doSubmit}
      error={error}
      title="New Shop"
    >
      <ImageInputList imagesLimit={MAX_IMAGES} />
      <FormField error={errors.price} label="Name" register={register} />
      <Selector register={register} />
      <SubmitButton label="Create" isLoading={isLoading} />
    </Form>
  );
};

export default ShopEditPage;
