import { useState } from "react";
import { z } from "zod";

import { useCategories, useForm } from "../../hooks";
import Form from "./Form";
import FormField from "./FormField";
import Select from "../Select";
import SubmitButton from "./SubmitButton";

const schema = z.object({
  title: z
    .string()
    .min(1, "Title should be between 1 and 50 characters")
    .max(50),
  price: z
    .string()
    .min(1, "Price should be between Ksh. 1 and  Ksh 1M")
    .max(1_000_000),
  description: z.string(),
  category: z.string().min(5),
});

type FormData = z.infer<typeof schema>;

const ListingEditForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { errors, handleSubmit, register } = useForm(schema);
  const { data: categories } = useCategories();

  const doSubmit = async (listingInfo: FormData) => {
    if (error) setError("");

    setLoading(true);
    console.log(listingInfo);
    setLoading(false);
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={doSubmit}
      error={error}
      usePageContainer={false}
    >
      <FormField error={errors.title} register={register} label="Title" />
      <FormField
        error={errors.price}
        register={register}
        label="Price"
        type="number"
      />
      <FormField
        error={errors.description}
        register={register}
        label="Description"
      />
      <Select label="Category" options={categories} register={register} />
      <SubmitButton label="Save" isLoading={isLoading} />
    </Form>
  );
};

export default ListingEditForm;
