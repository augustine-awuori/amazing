import { useState } from "react";
import { toast } from "react-toastify";

import { DataError } from "../../services/client";
import { Form, FormField, SubmitButton } from "../form";
import { ImageInputList, Select } from "../common";
import { Listing, ListingInfo } from "../../hooks/useListing";
import { ListingFormData, listingSchema } from "../../data/schemas";
import { Text } from "../../components";
import { useCategories, useForm, useImages, useListings } from "../../hooks";
import service from "../../services/listings";
import storage from "../../db/image";

interface Props {
  listing: Listing | undefined;
  onDone: () => void;
}

const ListingEditForm = ({ listing, onDone }: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { errors, handleSubmit, register } = useForm(listingSchema);
  const { categories: categories } = useCategories();
  const [title, setTitle] = useState(listing?.title);
  const [price, setPrice] = useState(listing?.price);
  const [description, setDescription] = useState(listing?.description);
  const { updateListing } = useListings();
  const { images } = useImages(3);

  const populate = (listingInfo: ListingFormData): ListingInfo => ({
    _id: listing?._id,
    author: listing?.author._id,
    ...listingInfo,
  });

  const doSubmit = async (listingInfo: ListingFormData) => {
    if (!listingInfo.category) return setError("Select category");

    if (error) setError("");
    setLoading(true);
    let imagesUrl;
    if (images[0]) {
      imagesUrl = await storage.saveImages(images);
      listingInfo.images = imagesUrl;
    }
    const { data, ok, problem } = await service.updateListing(
      populate(listingInfo)
    );
    setLoading(false);

    if (!ok) {
      const error = (data as DataError)?.error;
      toast.error(`Listing update failed!`);
      if (imagesUrl) await storage.deleteImages(imagesUrl);
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
      <ImageInputList imagesLimit={3} />
      <Text textAlign="center" color="yellow.200">
        ONLY modify what you wan' change
      </Text>
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
