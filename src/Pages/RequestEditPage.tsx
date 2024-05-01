import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { toast } from "react-toastify";

import { DataError } from "../services/client";
import { Form, FormField, SubmitButton } from "../components/form";
import { Request, populate } from "../hooks/useRequest";
import { requestSchema, RequestFormData } from "../data/schemas";
import { useCategories, useForm, useNoGrid, useRequests } from "../hooks";
import { authApi, requests as requestsApi } from "../services";
import notificationsService from "../services/pushNotifications";
import Select from "../components/common/Select";

const RequestEditPage = () => {
  const [error, setError] = useState("");
  const { errors, handleSubmit, register, reset } = useForm(requestSchema);
  const [isLoading, setLoading] = useState(false);
  const { categories: categories } = useCategories();
  const { addRequest } = useRequests();
  const navigate = useNavigate();
  useNoGrid();

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
    await notificationsService.notifyAll({
      body: `Someone is asking if you have a ${info.title}`,
      title: "Amazing Requests",
    });
    reset();
    navigate("/");
  };

  if (!authApi.getCurrentUser()) return <Navigate to="/login" replace />;

  const explanation =
    "Let's say a user is looking for a specific type of study desk with particular features, such as adjustable height and built-in storage. The user can submit a request through the 'request' feature, providing details about the desk they need. Sellers who have study desks matching the requested specifications or plan to list such desks in the future are notified of this request. They can then communicate with the user, offering their products or discussing details related to the request.";

  return (
    <Box mt={{ base: 5 }} m="0 auto">
      <Form
        handleSubmit={handleSubmit}
        onSubmit={doSubmit}
        title="New Request"
        error={error}
        explanation={explanation}
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
    </Box>
  );
};

export default RequestEditPage;
