import { useState } from "react";

import {
  Form,
  FormField,
  TextAreaField as LocationField,
  SubmitButton,
} from "../../components/form/index.ts";
import { shopSchema } from "../../data/schemas";
import { Text } from "../../components/index.ts";
import { useForm, useImages, useShop, useShops } from "../../hooks";
import Selector from "../../components/forms/FormShopTypeSelector";
import storage from "../../db/image";
import ImageInputList from "../../components/common/ImageInputList.tsx";

interface Props {
  onDone: () => void;
}

export interface UpdateShop extends FormData {
  image: string;
}

const ShopUpdateForm = ({ onDone }: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { errors, register, handleSubmit } = useForm(shopSchema);
  const { shop } = useShop();
  const helper = useShops();
  const [name, setName] = useState(shop?.name);
  const [location, setLocation] = useState(shop?.location);
  const { images } = useImages(1);

  const doSubmit = async (shopInfo: UpdateShop) => {
    if (error) setError("");
    if (!shop?._id) return setError("App Error");

    setLoading(true);
    const image = images[0];
    let imageUrl;
    if (image) imageUrl = await storage.saveImage(image);
    if (imageUrl) shopInfo.image = imageUrl;

    const res = await helper.update(shopInfo, shop._id);
    setLoading(false);

    if (res.ok) onDone();
    else {
      setError(res.error);
      if (imageUrl) await storage.deleteImage(imageUrl);
    }
  };

  return (
    <Form
      error={error}
      handleSubmit={handleSubmit}
      onSubmit={doSubmit}
      usePageContainer={false}
    >
      <ImageInputList imagesLimit={1} />
      <Text color="yellow.200" textAlign="center">
        Select image ONLY when changing it
      </Text>
      <FormField
        error={errors.name}
        label="Name"
        onChangeText={setName}
        register={register}
        textTransform="capitalize"
        value={name}
      />
      <Selector mb={2} register={register} />
      <LocationField
        error={errors.location}
        label="Location"
        onChange={setLocation}
        placeholder="Describe your shop location"
        register={register}
        value={location}
      />
      <SubmitButton label="Update" isLoading={isLoading} />
    </Form>
  );
};

export default ShopUpdateForm;
