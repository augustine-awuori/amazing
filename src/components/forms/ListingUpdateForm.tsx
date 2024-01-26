import { useState } from "react";
import { toast } from "react-toastify";

import { DataError } from "../../services/client";
import { Form, FormField, SubmitButton } from "../form";
import { Listing, ListingInfo } from "../../hooks/useListing";
import { ListingFormData, listingSchema } from "../../data/schemas";
import { useCategories, useForm, useListings } from "../../hooks";
import listingsService from "../../services/listings";
import Select from "../common/Select";

interface Props {
  listing: Listing | undefined;
  onDone: () => void;
}

const ListingEditForm = ({ listing, onDone }: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { errors, handleSubmit, register } = useForm(listingSchema);
  const { data: categories } = useCategories();
  const [title, setTitle] = useState(listing?.title);
  const [price, setPrice] = useState(listing?.price);
  const [description, setDescription] = useState(listing?.description);
  const { updateListing } = useListings();

  const populate = (listingInfo: ListingFormData): ListingInfo => ({
    _id: listing?._id,
    author: listing?.author._id,
    ...listingInfo,
  });

  const doSubmit = async (listingInfo: ListingFormData) => {
    if (!listingInfo.category) return setError("Select category");

    if (error) setError("");
    setLoading(true);
    const { data, ok, problem } = await listingsService.updateListing(
      populate(listingInfo)
    );
    setLoading(false);

    if (!ok) {
      const error = (data as DataError)?.error;
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
        onChangeText={setTitle}
        register={register}
        textTransform="capitalize"
        value={title}
      />
      <FormField
        error={errors.price}
        label="Price"
        onChangeText={(text) => setPrice(parseInt(text))}
        register={register}
        type="number"
        value={price}
      />
      <FormField
        error={errors.description}
        label="Description"
        onChangeText={setDescription}
        register={register}
        value={description}
      />
      <Select label="Category" options={categories} register={register} />
      <SubmitButton label="Save" isLoading={isLoading} />
    </Form>
  );
};

export default ListingEditForm;
