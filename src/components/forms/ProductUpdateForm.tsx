import { useState } from "react";

import { Button, Modal, Text } from "../../components";
import { Form, FormField, SubmitButton } from "../../components/form";
import { Product } from "../shops/product/Card";
import { ProductFormData, productSchema } from "../../data/schemas";
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
  const { errors, handleSubmit, register, reset } = useForm(productSchema);
  const { shop } = useShop();
  const service = useProducts(shop?._id);
  const [showModal, setShowModal] = useState(false);

  const doSubmit = async (info: ProductFormData) => {
    if (error) setError("");
    if (!product) return setError("App Error");

    setLoading(true);
    const { error: message, ok } = await service.update(info, product._id);
    setLoading(false);
    if (!ok) return setError(message);

    reset();
    onDone();
  };

  const handleDelete = async () => {
    onDone();
    setShowModal(false);

    if (!product) return;
    const { ok, error } = await service.deleteProductById(product._id);
    if (!ok) setError(error);
  };

  return (
    <>
      <Modal
        isOpen={showModal}
        title="Product Deletion Request"
        content={`Are you sure you want to delete "${name}" product permanently?`}
        onModalClose={() => setShowModal(false)}
        primaryBtnLabel="Confirm"
        secondaryBtnLabel="Cancel"
        onPrimaryClick={handleDelete}
        onSecondaryClick={() => setShowModal(false)}
      />
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
          onChangeText={setName}
          register={register}
          textTransform="capitalize"
          value={name}
        />
        <FormField
          error={errors.price}
          label="Price"
          onChangeText={(text) => setPrice(parseInt(text))}
          register={register}
          type="number"
          value={price}
        />
        <SubmitButton label="Update" isLoading={isLoading} />
        <Text textAlign="center" my={2}>
          or
        </Text>
        <Button
          w="100%"
          bgColor="red.200"
          _hover={{ bgColor: "red.300" }}
          onClick={() => setShowModal(true)}
        >
          Delete
        </Button>
      </Form>
    </>
  );
};

export default ProductUpdateForm;
