import { useState } from "react";

import { Form, FormField, SubmitButton } from "../../components/form";
import { FormData, schema } from "./NewProductForm";
import { Product } from "../../components/shops/ProductCard";
import { useForm, useProducts, useShop } from "../../hooks";

interface Props {
  product: Product | undefined;
  onDone: () => void;
}

const ProductUpdateForm = ({ onDone, product }: Props) => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState(product?.name);
  const [price, setPrice] = useState(product?.price);
  const { errors, handleSubmit, register, reset } = useForm(schema);
  const { shop } = useShop();
  const service = useProducts(shop?._id);

  const doSubmit = async (info: FormData) => {
    if (error) setError("");
    if (!product) return setError("App Error");

    setLoading(true);
    const { error: message, ok } = await service.update(info, product._id);
    setLoading(false);
    if (!ok) return setError(message);

    reset();
    onDone();
  };

  return (
    <Form
      error={error}
      handleSubmit={handleSubmit}
      onSubmit={doSubmit}
      title="Update Product"
      usePageContainer={false}
    >
      <FormField
        error={errors.name}
        label="Name"
        onChange={setName}
        register={register}
        value={name}
      />
      <FormField
        error={errors.price}
        label="Price"
        onChange={(text) => setPrice(parseInt(text))}
        register={register}
        type="number"
        value={price}
      />
      <SubmitButton label="Update" isLoading={isLoading} />
    </Form>
  );
};

export default ProductUpdateForm;
