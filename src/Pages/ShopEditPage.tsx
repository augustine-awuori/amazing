import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import {
  Form,
  FormField,
  TextAreaField as LocationField,
  SubmitButton,
} from "../components/form";
import { ImageInputList } from "../components/common";
import { Shop } from "../hooks/useShop";
import { ShopFormData, shopSchema } from "../data/schemas";
import { useForm, useImages, useNoGrid, useShops } from "../hooks";
import auth from "../services/auth";
import Selector from "../components/forms/FormShopTypeSelector";
import storage from "../utils/storage";

const MAX_IMAGES = 1;

const ShopEditPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { errors, handleSubmit, register, reset } = useForm(shopSchema);
  const { images, imagesCount, removeAllImages } = useImages(MAX_IMAGES);
  const shops = useShops();
  const user = auth.getCurrentUser();
  const navigate = useNavigate();
  useNoGrid();

  const createShop = async (info: ShopFormData) => {
    setLoading(true);
    const imageURL = await storage.saveImage(images[0]);
    const res = await shops.create({ ...info, image: imageURL });
    setLoading(false);

    if (!res.ok) await storage.deleteImage(imageURL);

    return res;
  };

  const doSubmit = async (info: ShopFormData) => {
    if (error) setError("");
    if (!imagesCount) return setError("Please select an image");

    const { data, error: resError, ok } = await createShop(info);
    if (!ok) return setError(resError);

    removeAllImages();
    reset();
    navigate(`/shops/${(data as Shop)._id}`);
  };

  if (!user) return <Navigate to="/login" replace />;

  return (
    <Box mt={{ base: 5 }} m="0 auto">
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
    </Box>
  );
};

export default ShopEditPage;
