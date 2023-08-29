import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

import { Form, FormField, SubmitButton } from "../components/forms";
import { Request } from "../hooks/useRequest";
import { useCategories, useForm } from "../hooks";
import requestsApi from "../services/requests";
import Select from "../components/Select";
import useRequests from "../hooks/useRequests";

const schema = z.object({
  category: z.string().min(5),
  description: z.string().min(6).max(100),
  title: z.string().min(4).max(50),
});

type FormData = z.infer<typeof schema>;

const RequestEditPage = () => {
  const [error, setError] = useState("");
  const { errors, handleSubmit, register, reset } = useForm(schema);
  const [isLoading, setLoading] = useState(false);
  const { data: categories } = useCategories();
  const { addRequest } = useRequests();

  const doSubmit = async (requestInfo: FormData) => {
    if (error) setError("");
    if (!requestInfo.category) setError("Select a request category!");

    setLoading(true);
    const response = (await requestsApi.create(requestInfo)) as {
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
