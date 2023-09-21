import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

import { Listing, ListingInfo, schema } from "../../hooks/useListing";
import { useCategories, useForm, useListings } from "../../hooks";
import Form from "./Form";
import FormField from "./FormField";
import listingsService from "../../services/listings";
import Select from "../common/Select";
import SubmitButton from "./SubmitButton";

type FormData = z.infer<typeof schema>;

interface Props {
  listing: Listing | undefined;
  onDone: () => void;
}

const ListingEditForm = ({ listing, onDone }: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { errors, handleSubmit, register } = useForm(schema);
  const { data: categories } = useCategories();
  const [title, setTitle] = useState(listing?.title);
  const [price, setPrice] = useState(listing?.price);
  const [description, setDescription] = useState(listing?.description);
  const { updateListing } = useListings();

  const populate = (listingInfo: FormData): ListingInfo => {
    const { category, description, price, title } = listingInfo;

    return {
      _id: listing?._id,
      author: listing?.author._id,
      category,
      description,
      price,
      title,
    };
  };

  const doSubmit = async (listingInfo: FormData) => {
    if (!listingInfo.category) return setError("Select category");

    if (error) setError("");
    setLoading(true);
    const { data, ok, problem } = await listingsService.updateListing(
      populate(listingInfo)
    );
    setLoading(false);

    if (!ok) {
      const error = (data as any)?.error;
      toast.error(`Listing update failed!`);
      return setError(error || problem);
    }

    updateListing(data as Listing);
    toast(`Listing updated successfully`);
    onDone();
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
