import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { Form, FormField, SubmitButton } from "../components/forms";
import { useCurrentUser, useForm, useProfileUser } from "../hooks";
import usersApi from "../services/users";

const schema = z.object({
  // avatar: z.string(),
  instagram: z.string(),
  name: z.string().min(3, "Name must be at least 3 characters").max(30),
  twitter: z.string(),
  username: z.string().min(3, "Username must be at least 3 characters").max(20),
  whatsapp: z
    .string()
    .min(12, "WhatsApp number should be either 12 or 13 characters")
    .max(13),
  youtube: z.string(),
});

type FormData = z.infer<typeof schema>;

const ProfileEditPage = () => {
  const params = useParams();
  const [error, setError] = useState("");
  const { errors, handleSubmit, register, reset } = useForm(schema);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { profileUser } = useProfileUser();
  const isTheOwner = useCurrentUser(params.userId);

  function checkUsername(userInfo: FormData): FormData {
    const info = { ...userInfo };

    if (!info.username.startsWith("@")) info.username = "@" + info.username;

    return info;
  }

  const doSubmit = async (userInfo: FormData) => {
    if (!isTheOwner) return navigate("/");

    setLoading(true);
    const { ok, data, problem } = await usersApi.updateUser(
      checkUsername(userInfo)
    );
    setLoading(false);

    if (!ok) {
      const responseData = data as { error?: string };
      return setError(responseData.error || problem);
    }

    toast.success("Changes saved");
    navigate(-1);
    reset();
  };

  return (
    <Form
      onSubmit={doSubmit}
      handleSubmit={handleSubmit}
      title="Edit Profile"
      error={error}
    >
      <FormField
        error={errors.name}
        register={register}
        label="Name"
        value={profileUser?.name}
      />
      <FormField
        error={errors.username}
        register={register}
        label="Username"
        value={profileUser?.username}
      />
      <FormField
        error={errors.instagram}
        register={register}
        label="Instagram"
        value={profileUser?.otherAccounts?.instagram}
      />
      <FormField
        error={errors.twitter}
        register={register}
        label="Twitter"
        value={profileUser?.otherAccounts?.twitter}
      />
      <FormField
        error={errors.whatsapp}
        register={register}
        label="WhatsApp"
        value={profileUser?.otherAccounts?.whatsapp}
      />
      <FormField
        error={errors.youtube}
        register={register}
        label="YouTube"
        value={profileUser?.otherAccounts?.youtube}
      />
      <SubmitButton label="Save Changes" isLoading={isLoading} />
    </Form>
  );
};

export default ProfileEditPage;
