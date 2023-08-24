import client from "./client";

const endpoint = "/users";

interface Props {
  aboutMe?: string;
  avatar?: string;
  coverPhoto?: string;
  instagram?: string;
  name: string;
  twitter?: string;
  username: string;
  youtube?: string;
  whatsapp: string;
  password?: string;
}

const register = ({ avatar, name, username, whatsapp, password }: Props) => {
  const data = new FormData();
  data.append("name", name);
  data.append("username", "@" + username);
  data.append("whatsapp", whatsapp);
  data.append("password", password);
  if (avatar)
    data.append("avatar", { name: "avatar", type: "image/jpeg", uri: avatar });

  return client.post(endpoint, data);
};

const getUser = (userId: string) => client.get(`${endpoint}/${userId}`);

const getUsers = () => client.get(`${endpoint}`);

const updateUser = (userInfo: Props, onUploadProgress = () => {}) => {
  const {
    aboutMe,
    avatar,
    coverPhoto,
    instagram,
    name,
    twitter,
    username,
    whatsapp,
    youtube,
  } = userInfo;

  const data = new FormData();
  if (aboutMe) data.append("aboutMe", aboutMe);
  data.append("name", name);
  data.append("username", username);
  if (instagram) data.append("instagram", instagram);
  if (twitter) data.append("twitter", twitter);
  if (youtube) data.append("youtube", youtube);
  data.append("whatsapp", whatsapp);
  if (avatar)
    data.append("images", { name: "avatar", type: "image/jpeg", uri: avatar });
  if (coverPhoto)
    data.append("images", {
      name: "coverPhoto",
      type: "image/jpeg",
      uri: coverPhoto,
    });

  return client.patch(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default { getUser, getUsers, register, updateUser };
