import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Form, FormField, SubmitButton } from "../components/forms";
import { FormData, Request, populate, schema } from "../hooks/useRequest";
import { useCategories, useForm, useRequests } from "../hooks";
import requestsApi from "../services/requests";
import Select from "../components/Select";

const RequestEditPage = () => {
  const [error, setError] = useState("");
  const { errors, handleSubmit, register, reset } = useForm(schema);
  const [isLoading, setLoading] = useState(false);
  const { data: categories } = useCategories();
  const { addRequest } = useRequests();
  const navigate = useNavigate();

  const doSubmit = async (info: FormData) => {
    if (error) setError("");
    if (!info.category) setError("Select a request category!");

    setLoading(true);
    const response = (await requestsApi.create(populate(info, undefined))) as {
      data: Request;
      problem: string;
      ok: boolean;
    };
    setLoading(false);

    if (!response.ok) {
      toast.error("Request creation failed!");
      const responseData = response.data as { error?: string };
      if (responseData && responseData.error) {
        setError(responseData.error);
      } else {
        setError(response.problem);
      }
    } else {
      addRequest(response.data);
      toast("Request created successfully!");
      reset();
      navigate("/");
    }
  };

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
