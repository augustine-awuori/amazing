import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { DataError } from "../services/client";
import { Form, FormField, SubmitButton } from "../components/form";
import { Listing } from "../hooks/useListing";
import { listingSchema, ListingFormData } from "../data/schemas";
import { useForm, useImages, useListings } from "../hooks";
import auth from "../services/auth";
import CategorySelect from "../components/listings/category/Select";
import ImageInputList from "../components/common/ImageInputList";
import service from "../services/listings";

const MAX_IMAGES = 3;

const ListingEditPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { errors, handleSubmit, register, reset } = useForm(listingSchema);
  const { imagesCount, images, removeAllImages } = useImages(MAX_IMAGES);
  const { addListing } = useListings();
  const navigate = useNavigate();

  const createListing = async (info: ListingFormData) => {
    setLoading(true);
    const response = await service.addListing({ ...info, images });
    setLoading(false);

    return response;
  };

  const doSubmit = async (info: ListingFormData) => {
    if (error) setError("");
    if (!imagesCount) return setError("Please select at least one image");

    const { data, ok, problem } = await createListing(info);
    if (!ok) return setError((data as DataError)?.error || problem);
    addListing(data as Listing);

    toast.success("Listing created successfully");
    reset();
    navigate("/");
    removeAllImages();
  };

  if (!auth.getCurrentUser()) return <Navigate to="/login" replace />;

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={doSubmit}
      error={error}
      title="New Listing"
    >
      <ImageInputList imagesLimit={MAX_IMAGES} />
      <FormField error={errors.title} register={register} label="Title" />
      <FormField
        error={errors.price}
        label="Price"
        register={register}
        type="number"
      />
      <FormField
        error={errors.description}
        label="Description"
        register={register}
      />
      <CategorySelect register={register} />
      <SubmitButton label="Create" isLoading={isLoading} />
    </Form>
  );
};

export default ListingEditPage;
