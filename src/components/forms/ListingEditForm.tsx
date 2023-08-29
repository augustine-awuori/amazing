import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

import { Listing, ListingInfo } from "../../hooks/useListing";
import { useCategories, useForm } from "../../hooks";
import Form from "./Form";
import FormField from "./FormField";
import listingsService from "../../services/listings";
import Select from "../Select";
import SubmitButton from "./SubmitButton";

const schema = z.object({
  title: z
    .string()
    .min(1, "Title should be between 1 and 50 characters")
    .max(50),
  price: z
    .string()
    .min(1, "Price should be between Ksh 1 and  Ksh 1M")
    .max(1_000_000),
  description: z.string(),
  category: z.string().min(5),
});

type FormData = z.infer<typeof schema>;

interface Props {
  listing: Listing | undefined;
}

const ListingEditForm = ({ listing }: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { errors, handleSubmit, register } = useForm(schema);
  const { data: categories } = useCategories();
  const [title, setTitle] = useState(listing?.title);
  const [price, setPrice] = useState(listing?.price);
  const [description, setDescription] = useState(listing?.description);

  const populate = (listingInfo: FormData): ListingInfo => {
    const { category, description, price, title } = listingInfo;

    return {
      _id: listing?._id,
      authorId: listing?.author._id,
      categoryId: category,
      description,
      price,
      title,
    };
  };

  const doSubmit = async (listingInfo: FormData) => {
    if (!listingInfo.category) return setError("Select category");

    if (error) setError("");
    setLoading(true);
    const response = await listingsService.updateListing(populate(listingInfo));
    setLoading(false);

    const { data, ok, problem } = response;
    if (!ok) {
      const error = (data as any)?.error;
      toast.error(`Listing update failed!`);
      return setError(error || problem);
    }

    toast(`Listing updated successfully`);
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={doSubmit}
      error={error}
      usePageContainer={false}
    >
      <FormField
        error={errors.title}
        label="Title"
        onChange={setTitle}
        register={register}
        value={title}
      />
      <FormField
        error={errors.price}
        label="Price"
        onChange={(text) => setPrice(parseInt(text))}
        register={register}
        type="number"
        value={price}
      />
      <FormField
        error={errors.description}
        label="Description"
        onChange={setDescription}
        register={register}
        value={description}
      />
      <Select label="Category" options={categories} register={register} />
      <SubmitButton label="Save" isLoading={isLoading} />
    </Form>
  );
};

export default ListingEditForm;
