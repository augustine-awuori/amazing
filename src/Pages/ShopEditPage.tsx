import { useState } from "react";
import { Navigate } from "react-router-dom";
import { z } from "zod";

import {
  Form,
  FormField,
  TextAreaField as LocationField,
  SubmitButton,
} from "../components/form";
import { ImageInputList } from "../components/common";
import { useForm, useImages, useShops } from "../hooks";
import auth from "../services/auth";
import Selector from "../components/forms/FormShopTypeSelector";

const schema = z.object({
  name: z.string().min(3, "Name should be between 3 & 50 chars").max(50),
  location: z
    .string()
    .min(3, "Location description should be btn 3 & 255 chars")
    .max(255),
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

  const createShop = async (info: FormData) => {
    setLoading(true);
    const res = await shops.create({ ...info, image: images[0] });
    setLoading(false);

    return res;
  };

  const doSubmit = async (info: FormData) => {
    if (error) setError("");
    if (!imagesCount) return setError("Please select an image");

    const { error: resError, ok } = await createShop(info);
    if (!ok) return setError(resError);

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
      <FormField error={errors.name} label="Name" register={register} />
      <Selector mb={2} register={register} />
      <LocationField
        error={errors.location}
        label="Location"
        placeholder="Describe your shop location"
        register={register}
      />
      <SubmitButton label="Create" isLoading={isLoading} />
    </Form>
  );
};

export default ShopEditPage;
