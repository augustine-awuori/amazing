import { useState } from "react";
import { toast } from "react-toastify";

import { DataError } from "../../services/client";
import { Request, populate } from "../../hooks/useRequest";
import { requestSchema, RequestFormData } from "../../data/schemas";
import { useCategories, useForm, useRequests } from "../../hooks";
import { Form, FormField } from "../form";
import SubmitButton from "../form/SubmitButton";
import requestsService from "../../services/requests";
import Select from "../common/Select";

interface Props {
  request: Request | undefined;
  onDone: () => void;
}

const RequestUpdateForm = ({ onDone, request }: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { errors, handleSubmit, register } = useForm(requestSchema);
  const { categories: categories } = useCategories();
  const [title, setTitle] = useState(request?.title);
  const [description, setDescription] = useState(request?.description);
  const { updateRequest } = useRequests();

  const doSubmit = async (info: RequestFormData) => {
    if (!info.category) return setError("Select category");
    if (!request?._id || !request?.author?._id)
      return setError("Error loading request, try again later");
    if (error) setError("");

    setLoading(true);
    const populated = populate(info, request);
    if (!populated) return;
    const { data, ok, problem } = await requestsService.update(
      populated,
      request._id
    );
    setLoading(false);

    if (!ok) {
      const error = (data as DataError)?.error;
      toast.error(`Request update failed!`);
      return setError(error || problem);
    }

    updateRequest(data as Request);
    toast(`Request updated successfully`);
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
        value={title}
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

export default RequestUpdateForm;
