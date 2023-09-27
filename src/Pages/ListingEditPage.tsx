import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { DataError } from "../services/client";
import { Form, FormField, SubmitButton } from "../components/form";
import { Listing, schema } from "../hooks/useListing";
import { useForm, useImages, useListings } from "../hooks";
import auth from "../services/auth";
import CategorySelect from "../components/listings/category/Select";
import ImageInputList from "../components/common/ImageInputList";
import service from "../services/listings";

type FormData = z.infer<typeof schema>;

const MAX_IMAGES = 3;

const ListingEditPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { errors, handleSubmit, register, reset } = useForm(schema);
  const user = auth.getCurrentUser();
  const { imagesCount, images, removeAllImages } = useImages(MAX_IMAGES);
  const { addListing } = useListings();
  const navigate = useNavigate();

  const doSubmit = async (info: FormData) => {
    if (error) setError("");
    if (!imagesCount) return setError("Please select at least one image");

    setLoading(true);
    const listing = { ...info, images };
    const { data, ok, problem } = await service.addListing(listing);
    setLoading(false);

    if (!ok) return setError((data as DataError)?.error || problem);

    toast.success("Listing created successfully");
    addListing(data as Listing);
    reset();
    navigate("/");
    removeAllImages();
  };

  if (!user) return <Navigate to="/login" replace />;

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
