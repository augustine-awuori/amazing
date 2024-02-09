import { useState } from "react";
import { z } from "zod";
import { toast } from "react-toastify";

import { Form, ErrorMessage, FormField, SubmitButton } from "./form";
import { useForm } from "../hooks";
import helper from "../services/events.ts";

const schema = z.object({
  name: z.string().min(3, "Your name should be at least 3 chars"),
  username: z.string(),
});

export type RSVPFormData = z.infer<typeof schema>;

interface Props {
  eventId: string | undefined;
  onDone: () => void;
}

const RSVPForm = ({ eventId, onDone }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { errors, handleSubmit, register } = useForm(schema);

  const doSubmit = async (info: RSVPFormData) => {
    if (!eventId) return;

    setError("");
    setLoading(true);
    const { ok } = await helper.rsvp(eventId, info);
    setLoading(false);

    if (ok) {
      onDone();
      toast.success("RSVP successful!");
    } else toast.error("RSVP failed!");
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={doSubmit}
      usePageContainer={false}
    >
      <ErrorMessage error={error} />
      <FormField error={errors.name} label="Name" register={register} />
      <FormField
        error={errors.username}
        label="Username"
        placeholder="Username (optional)"
        register={register}
      />
      <SubmitButton isLoading={loading} label="Send RSVP" />
    </Form>
  );
};

export default RSVPForm;
