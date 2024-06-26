import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { toast } from "react-toastify";

import { DataError } from "../services/client";
import { Form, FormField, SubmitButton } from "../components/form";
import { Listing } from "../hooks/useListing";
import { listingSchema, ListingFormData } from "../data/schemas";
import { useForm, useImages, useListings, useUser } from "../hooks";
import CategorySelect from "../components/listings/category/Select";
import ImageInputList from "../components/common/ImageInputList";
import service from "../services/listings";
import storage from "../db/image";

const MAX_IMAGES = 3;

const ListingEditPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { errors, handleSubmit, register, reset } = useForm(listingSchema);
  const { imagesCount, images, removeAllImages } = useImages(MAX_IMAGES);
  const { addListing } = useListings();
  const navigate = useNavigate();
  const currentUser = useUser();

  const createListing = async (info: ListingFormData) => {
    setLoading(true);
    const imagesURL = await storage.saveImages(images);
    const response = await service.addListing({
      ...info,
      images: imagesURL,
    });
    setLoading(false);

    if (!response.ok) await storage.deleteImages(imagesURL);

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

  if (!currentUser) return <Navigate to="/login" replace />;

  return (
    <Box mt={{ base: 5 }}>
      <Form
        handleSubmit={handleSubmit}
        onSubmit={doSubmit}
        error={error}
        title="New Listing"
        explanation="A 'listing' refers to a detailed description of a specific item, like chairs, beds, laptop, etc., that a user wants to sell."
      >
        <ImageInputList imagesLimit={MAX_IMAGES} />
        <FormField
          error={errors.title}
          register={register}
          label="Title"
          textTransform="capitalize"
        />
        <FormField
          error={errors.price}
          label="Price"
          register={register}
          type="number"
        />
        <FormField
          error={errors.description}
          label="Description (optional)"
          name="description"
          register={register}
        />
        <CategorySelect register={register} />
        <SubmitButton label="Create" isLoading={isLoading} />
      </Form>
    </Box>
  );
};

export default ListingEditPage;
