import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { BadgesList } from "../../components/common";
import { Form, FormField, SubmitButton } from "../form";
import { NewProduct } from "../../services/products";
import { ProductFormData, productSchema } from "../../data/schemas";
import { Shop } from "../../hooks/useShop";
import { Text } from "..";
import { useForm, useImages, useProducts } from "../../hooks";
import authApi from "../../services/auth";
import ImageInputList from "../common/ImageInputList";
import storage from "../../db/image";
import useTypes, { Type } from "../../hooks/useTypes";

const MAX_IMAGES_INPUT = 3;

interface Props {
  onDone: () => void;
  shop: Shop;
}

const NewProductForm = ({ onDone, shop }: Props) => {
  const { errors, handleSubmit, register, reset } = useForm(productSchema);
  const { imagesCount, images, removeAllImages } = useImages(MAX_IMAGES_INPUT);
  const [isLoading, setLoading] = useState(false);
  const [types, setTypes] = useState<Type[]>([]);
  const [selectedType, setSelectedType] = useState<Type>();
  const { types: allTypes } = useTypes();
  const [error, setError] = useState("");
  const user = authApi.getCurrentUser();
  const helper = useProducts(shop._id);

  useEffect(() => {
    initShopTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shop._id]);

  function initShopTypes() {
    const types: Type[] = [];

    allTypes.forEach((type) => {
      if (shop.types[type._id]) types.push(type);
    });

    setTypes(types);
  }

  const makeProductFrom = async (
    info: ProductFormData
  ): Promise<NewProduct | undefined> => {
    if (!imagesCount) {
      setError("Select an image");
      return;
    }

    if (!types.length || !user) {
      setError("App Error! Refresh page!");
      return;
    }

    if (!selectedType) {
      setError("Select the product type");
      return;
    }

    const imagesUrl = await storage.saveImages(images);
    if (!imagesUrl.length) {
      setError("Error saving images");
      return;
    }

    if (user)
      return {
        ...info,
        author: user._id,
        images: imagesUrl,
        shop: shop._id,
        type: selectedType._id,
      };
  };

  const doSubmit = async (info: ProductFormData) => {
    setLoading(true);
    if (error) setError("");

    const newProduct = await makeProductFrom(info);
    if (!user || !newProduct) {
      setLoading(false);
      return;
    }

    const { error: message, ok } = await helper.create(newProduct);
    setLoading(false);

    if (!ok) {
      await storage.deleteImages(newProduct.images);

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
      <ImageInputList imagesLimit={MAX_IMAGES_INPUT} />
      <Text mt={0} mb={2}>
        Product Type
      </Text>
      <BadgesList
        list={types}
        onItemSelect={setSelectedType}
        selectedItem={selectedType}
      />
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
