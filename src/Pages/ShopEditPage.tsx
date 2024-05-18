import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import {
  Form,
  FormField,
  TextAreaField as LocationField,
  SubmitButton,
} from "../components/form";
import { ImageInputList } from "../components/common";
import { prepShopTypes } from "../utils/funcs";
import { Shop } from "../hooks/useShop";
import { ShopFormData, shopSchema } from "../data/schemas";
import { ProductType } from "../hooks/useProductTypes";
import { useForm, useImages, useShops } from "../hooks";
import auth from "../services/auth";
import ShopTypesSelector, {
  ShopTypes,
} from "../components/shops/TypesSelector";
import storage from "../db/image";

const MAX_IMAGES = 1;

const ShopEditPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [selectedShopTypes, setSelectedShopTypes] = useState<ShopTypes>({});
  const { errors, handleSubmit, register, reset } = useForm(shopSchema);
  const { images, imagesCount, removeAllImages } = useImages(MAX_IMAGES);
  const shops = useShops();
  const user = auth.getCurrentUser();
  const navigate = useNavigate();

  const createShop = async (info: ShopFormData) => {
    setLoading(true);
    const image = await storage.saveImage(images[0]);
    const res = await shops.create({
      ...info,
      image,
      types: prepShopTypes(selectedShopTypes),
    });
    setLoading(false);

    if (!res.ok) await storage.deleteImage(image);

    return res;
  };

  const doSubmit = async (info: ShopFormData) => {
    if (error) setError("");
    if (!imagesCount) return setError("Please select an image");
    if (!Object.keys(selectedShopTypes).length)
      return setError("Please select at least one shop type");

    const { data, error: resError, ok } = await createShop(info);
    if (!ok) return setError(resError);

    removeAllImages();
    reset();
    navigate(`/shops/${(data as Shop)._id}`);
  };

  const handleTypeSelect = (type: ProductType) => {
    if (!selectedShopTypes[type._id])
      setSelectedShopTypes({ ...selectedShopTypes, [type._id]: type });
    else {
      const newTypes = { ...selectedShopTypes };
      delete newTypes[type._id];
      setSelectedShopTypes(newTypes);
    }
  };

  if (!user) return <Navigate to="/login" replace />;

  const explanation =
    "Unleash the entrepreneur in you! 🚀 Create your own Shop and showcase a treasure trove of products that stand out. 🛍️ Your Shop gets the spotlight on the home page, grabbing attention from eager shoppers. Got just a handful of gems? No worries, add them as Listings for a quick showcase. 🌟 Whether you're a boutique owner, an artist, or a craftsperson, let your products shine in your exclusive Shop and captivate the audience!";

  return (
    <Form
      error={error}
      explanation={explanation}
      handleSubmit={handleSubmit}
      m="0 auto"
      mt={{ base: 5 }}
      onSubmit={doSubmit}
      title="New Shop"
    >
      <ImageInputList imagesLimit={MAX_IMAGES} />
      <FormField
        error={errors.name}
        label="Name"
        register={register}
        textTransform="capitalize"
      />
      <ShopTypesSelector
        onTypeSelect={handleTypeSelect}
        selectedTypes={selectedShopTypes}
      />
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
