import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { DataError } from "../services/client";
import { Form, FormField, SubmitButton } from "../components/form";
import { Request, populate } from "../hooks/useRequest";
import { requestSchema, RequestFormData } from "../data/schemas";
import { useCategories, useForm, useRequests } from "../hooks";
import { authApi, requests as requestsApi } from "../services";
import Select from "../components/common/Select";

const RequestEditPage = () => {
  const [error, setError] = useState("");
  const { errors, handleSubmit, register, reset } = useForm(requestSchema);
  const [isLoading, setLoading] = useState(false);
  const { data: categories } = useCategories();
  const { addRequest } = useRequests();
  const navigate = useNavigate();

  const createRequest = async (info: RequestFormData) => {
    setLoading(true);
    const response = await requestsApi.create(populate(info, undefined));
    setLoading(false);

    return response;
  };

  const doSubmit = async (info: RequestFormData) => {
    if (error) setError("");
    if (!info.category) setError("Select a request category!");

    const { data, ok, problem } = await createRequest(info);
    if (!ok) {
      toast.error("Request creation failed!");
      return setError((data as DataError)?.error || problem);
    }

    addRequest(data as Request);
    toast("Request created successfully!");
    reset();
    navigate("/");
  };

  if (!authApi.getCurrentUser()) return <Navigate to="/login" replace />;

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={doSubmit}
      title="New Request"
      error={error}
    >
      <FormField error={errors.title} label="Title" register={register} />
      <FormField
        error={errors.description}
        label="Description"
        register={register}
      />
      <Select label="Category" options={categories} register={register} />
      <SubmitButton label="Save Request" isLoading={isLoading} />
    </Form>
  );
};

export default RequestEditPage;
