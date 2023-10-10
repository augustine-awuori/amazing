import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { DataError } from "../services/client";
import { Form, FormField, SubmitButton } from "../components/form";
import { FormData, Request, populate, schema } from "../hooks/useRequest";
import { useCategories, useForm, useRequests } from "../hooks";
import auth from "../services/auth";
import requestsApi from "../services/requests";
import Select from "../components/common/Select";

const RequestEditPage = () => {
  const [error, setError] = useState("");
  const { errors, handleSubmit, register, reset } = useForm(schema);
  const [isLoading, setLoading] = useState(false);
  const { data: categories } = useCategories();
  const { addRequest } = useRequests();
  const navigate = useNavigate();

  const createRequest = async (info: FormData) => {
    setLoading(true);
    const response = await requestsApi.create(populate(info, undefined));
    setLoading(false);

    return response;
  };

  const doSubmit = async (info: FormData) => {
    if (error) setError("");
    if (!info.category) setError("Select a request category!");

    const { data, ok, problem } = await createRequest(info);
    if (!ok) {
      toast.error("Request creation failed!");
      return setError((data as DataError).error || problem);
    }

    addRequest(data as Request);
    toast("Request created successfully!");
    reset();
    navigate("/");
  };

  if (!auth.getCurrentUser()) return <Navigate to="/login" replace />;

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
