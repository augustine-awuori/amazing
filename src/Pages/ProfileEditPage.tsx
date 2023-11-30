import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { DataError } from "../services/client";
import { Form, FormField, SubmitButton } from "../components/form";
import { ProfileEditFormData, profileEditSchema } from "../data/schemas";
import { UpdatableUserInfo } from "../hooks/useUser";
import { useCurrentUser, useForm, useProfileUser } from "../hooks";
import usersApi from "../services/users";

const ProfileEditPage = () => {
  const params = useParams();
  const userId = params.userId;
  const [error, setError] = useState("");
  const { errors, handleSubmit, register, reset } = useForm(profileEditSchema);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { profileUser, getChangedInfo } = useProfileUser();
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

  function checkUsername(userInfo: UpdatableUserInfo): UpdatableUserInfo {
    const info = { ...userInfo };

    if (!info?.username?.startsWith("@")) info.username = "@" + info.username;

    return info;
  }

  const updateInfo = async (info: UpdatableUserInfo) => {
    if (!userId) {
      const problem = "App Error!";
      setError(problem);
      return { data: null, ok: false, problem };
    }

    setLoading(true);
    const response = await usersApi.updateUserInfo(checkUsername(info), userId);
    setLoading(false);

    return response;
  };

  const doSubmit = async (userInfo: ProfileEditFormData) => {
    if (!isTheOwner) return navigate("/");

    const { data, ok, problem } = await updateInfo(getChangedInfo(userInfo));
    if (!ok) return setError((data as DataError)?.error || problem);

    toast.success("Changes saved");
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
