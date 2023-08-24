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
  if (password) data.append("password", password);
  if (avatar) {
    data.append(
      "avatar",
      new File([avatar], "avatar.jpg", { type: "image/jpeg" })
    );
  }

  return client.post(endpoint, data);
};

const getUser = (userId: string) => client.get(`${endpoint}/${userId}`);

const getUsers = () => client.get(`${endpoint}`);

const updateUser = (
  userInfo: Props,
  onUploadProgress: (progress: number) => void = () => {}
) => {
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
  if (avatar) {
    const avatarFile = new File([avatar], "avatar.jpg", { type: "image/jpeg" });
    data.append("images", avatarFile);
  }
  if (coverPhoto) {
    const coverPhotoFile = new File([coverPhoto], "coverPhoto.jpg", {
      type: "image/jpeg",
    });
    data.append("images", coverPhotoFile);
  }

  return client.patch(endpoint, data, {
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total !== null && progressEvent.total !== undefined) {
        const progress = (progressEvent.loaded / progressEvent.total) * 100;
        onUploadProgress(progress);
      }
    },
  });
};

export default { getUser, getUsers, register, updateUser };
