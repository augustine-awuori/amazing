import { useState } from "react";
import { Navigate } from "react-router-dom";
import { z } from "zod";

import { ImageInputList } from "../../components/common";
import { useForm, useImages, useProducts } from "../../hooks";
import authApi from "../../services/auth";
import Form from "./Form";
import FormField from "./FormField";
import SubmitButton from "./SubmitButton";

const schema = z.object({
  name: z.string().min(1, "Name should be between 1 and 50 characters").max(50),
  price: z
    .string()
    .min(1, "Price should be between Ksh 1 and  Ksh 1M")
    .max(1_000_000),
});

type FormData = z.infer<typeof schema>;

const IMAGES_COUNT = 1;

interface Props {
  shopId: string;
}

const NewProductForm = ({ shopId }: Props) => {
  const { errors, handleSubmit, register, reset } = useForm(schema);
  const { imagesCount, images, removeAllImages } = useImages(IMAGES_COUNT);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = authApi.getCurrentUser();
  const products = useProducts(shopId);

  const makeShopFrom = (info: FormData) => {
    if (user)
      return { ...info, author: user._id, image: images[0], shop: shopId };
  };

  const doSubmit = async (info: FormData) => {
    if (error) setError("");
    if (!imagesCount) return setError("Select an image");
    const shop = makeShopFrom(info);
    if (!user || !shop) return;

    setLoading(true);
    const { error: message, ok } = await products.create(shop);
    setLoading(false);
    if (!ok) return setError(message);

    removeAllImages();
    reset();
  };

  if (!user) return <Navigate to="/login" replace />;

  return (
    <Form
      error={error}
      handleSubmit={handleSubmit}
      onSubmit={doSubmit}
      title="New Product"
      usePageContainer={false}
    >
      <ImageInputList imagesLimit={IMAGES_COUNT} />
      <FormField error={errors.name} label="Name" register={register} />
      <FormField
        error={errors.price}
        label="Price"
        register={register}
        type="number"
      />
      <SubmitButton label="Save" isLoading={isLoading} />
    </Form>
  );
};

export default NewProductForm;
