import { useState } from "react";
import { Navigate } from "react-router-dom";

import { Form, FormField, SubmitButton } from "../form";
import { NewProduct } from "../../services/products";
import { ProductFormData, productSchema } from "../../data/schemas";
import { useForm, useImages, useProducts } from "../../hooks";
import authApi from "../../services/auth";
import storage from "../../db/image";
import ImageInputList from "../common/ImageInputList";

const IMAGES_COUNT = 3;

interface Props {
  onDone: () => void;
  shopId: string;
}

const NewProductForm = ({ onDone, shopId }: Props) => {
  const { errors, handleSubmit, register, reset } = useForm(productSchema);
  const { imagesCount, images, removeAllImages } = useImages(IMAGES_COUNT);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = authApi.getCurrentUser();
  const products = useProducts(shopId);

  const makeShopFrom = async (
    info: ProductFormData
  ): Promise<NewProduct | undefined> => {
    if (!user) return;

    const imgs: string[] = [];
    const promises = images.map(async (image) => {
      const url = await storage.saveImage(image);
      imgs.push(url);

      return url;
    });
    await Promise.all([promises]);

    if (user)
      return {
        ...info,
        author: user._id,
        images: imgs,
        shop: shopId,
      };
  };

  const doSubmit = async (info: ProductFormData) => {
    setLoading(true);
    if (error) setError("");
    if (!imagesCount) return setError("Select an image");
    const shop = await makeShopFrom(info);
    if (!user || !shop) return;

    const { error: message, ok } = await products.create(shop);
    setLoading(false);

    if (!ok) {
      shop.images.forEach(async (img) => await storage.deleteImage(img));

      return setError(message);
    }

    onDone();
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
      <FormField
        error={errors.name}
        label="Name"
        register={register}
        textTransform="capitalize"
      />
      <FormField
        error={errors.price}
        label="Price"
        register={register}
        type="number"
      />
      <FormField
        error={errors.description}
        label="Description"
        register={register}
      />
      <SubmitButton label="Save" isLoading={isLoading} />
    </Form>
  );
};

export default NewProductForm;
