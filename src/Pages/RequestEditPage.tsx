import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

import { Form, FormField, SubmitButton } from "../components/forms";
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
    if (!requestInfo.category) setError("Select request category!");

    setLoading(true);
    const { data, ok, problem } = await requestsApi.create(requestInfo);
    setLoading(false);
    if (!ok) {
      toast.error("Request creation failed!");
      return setError(data?.error || problem);
    }

    addRequest(data);
    toast("Request created successfully!");
    reset();
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
      <Select
        label="Category"
        options={categories.filter((c) => c._id)}
        register={register}
      />
      <SubmitButton label="Save Request" isLoading={isLoading} />
    </Form>
  );
};

export default RequestEditPage;
