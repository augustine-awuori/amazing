import { useState } from "react";

import {
  Form,
  FormField,
  TextAreaField as LocationField,
  SubmitButton,
} from "../../components/form/index.ts";
import { ShopFormData, shopSchema } from "../../data/schemas";
import { useForm, useShop, useShops } from "../../hooks";
import Selector from "../../components/forms/FormShopTypeSelector";

interface Props {
  onDone: () => void;
}

const ShopUpdateForm = ({ onDone }: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { errors, register, handleSubmit } = useForm(shopSchema);
  const { shop } = useShop();
  const helper = useShops();
  const [name, setName] = useState(shop?.name);
  const [location, setLocation] = useState(shop?.location);

  const doSubmit = async (shopInfo: ShopFormData) => {
    if (error) setError("");
    if (!shop?._id) return setError("App Error");

    setLoading(true);
    const res = await helper.update(shopInfo, shop._id);
    setLoading(false);

    res.ok ? onDone() : setError(res.error);
  };

  return (
    <Form
      error={error}
      handleSubmit={handleSubmit}
      onSubmit={doSubmit}
      usePageContainer={false}
    >
      <FormField
        error={errors.name}
        label="Name"
        onChange={setName}
        register={register}
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
