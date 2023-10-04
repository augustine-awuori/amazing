import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { Form, FormField, SubmitButton } from "../components/form";
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
  const userId = params.userId;
  const [error, setError] = useState("");
  const { errors, handleSubmit, register, reset } = useForm(schema);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { profileUser } = useProfileUser();
  const isTheOwner = useCurrentUser(userId);
  const [name, setName] = useState(profileUser?.name || "");
  const [username, setUsername] = useState(profileUser?.username || "");
  const [instagram, setInstagram] = useState(
    profileUser?.otherAccounts.instagram || ""
  );
  const [twitter, setTwitter] = useState(
    profileUser?.otherAccounts.twitter || ""
  );
  const [whatsApp, setWhatsApp] = useState(
    profileUser?.otherAccounts.whatsapp || ""
  );
  const [youtube, setYouTube] = useState(
    profileUser?.otherAccounts.youtube || ""
  );

  function checkUsername(userInfo: FormData): FormData {
    const info = { ...userInfo };

    if (!info.username.startsWith("@")) info.username = "@" + info.username;

    return info;
  }

  const doSubmit = async (userInfo: FormData) => {
    if (!isTheOwner) return navigate("/");

    if (!userId) return setError("App error");

    setLoading(true);
    const { ok, data, problem } = await usersApi.updateUserInfo(
      checkUsername(userInfo),
      userId
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
        label="Name"
        onChange={setName}
        register={register}
        value={name}
      />
      <FormField
        error={errors.username}
        label="Username"
        onChange={setUsername}
        register={register}
        value={username}
      />
      <FormField
        error={errors.instagram}
        label="Instagram"
        onChange={setInstagram}
        register={register}
        value={instagram}
      />
      <FormField
        error={errors.twitter}
        label="Twitter"
        onChange={setTwitter}
        register={register}
        value={twitter}
      />
      <FormField
        error={errors.whatsapp}
        label="WhatsApp"
        onChange={setWhatsApp}
        register={register}
        value={whatsApp}
      />
      <FormField
        error={errors.youtube}
        label="YouTube"
        onChange={setYouTube}
        register={register}
        value={youtube}
      />
      <SubmitButton label="Save Changes" isLoading={isLoading} />
    </Form>
  );
};

export default ProfileEditPage;
