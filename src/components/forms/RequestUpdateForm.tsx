import { useState } from "react";
import { toast } from "react-toastify";

import { useCategories, useForm, useRequests } from "../../hooks";
import { Request, schema, populate, FormData } from "../../hooks/useRequest";
import FormField from "../form/FormField";
import SubmitButton from "../form/SubmitButton";
import requestsService from "../../services/requests";
import Form from "../form/Form";
import Select from "../common/Select";

interface Props {
  request: Request | undefined;
  onDone: () => void;
}

const RequestUpdateForm = ({ onDone, request }: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { errors, handleSubmit, register } = useForm(schema);
  const { data: categories } = useCategories();
  const [title, setTitle] = useState(request?.title);
  const [description, setDescription] = useState(request?.description);
  const { updateRequest } = useRequests();

  const doSubmit = async (info: FormData) => {
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
      const error = (data as any)?.error;
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
        onChange={setTitle}
        register={register}
        value={title}
      />
      <FormField
        error={errors.description}
        label="Description"
        onChange={setDescription}
        register={register}
        value={description}
      />
      <Select label="Category" options={categories} register={register} />
      <SubmitButton label="Save" isLoading={isLoading} />
    </Form>
  );
};

export default RequestUpdateForm;
