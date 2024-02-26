import { v4 } from "uuid";

import db from "./config";

export const saveImage = async (image: File) => {
  const result = await db.uploadBytes(db.ref(db.storage, v4()), image, {
    contentType: image.type,
  });

  return await db.getDownloadURL(result.ref);
};

export const saveImages = (images: File[]) => {
  const promises = images.map(async (image) => await saveImage(image));

  return Promise.all(promises);
};

export const deleteImage = async (url: string) =>
  await db.deleteObject(db.ref(db.storage, url));

export const deleteImages = async (urls: string[]) => {
  const promises = urls.map(async (url) => await deleteImage(url));

  Promise.all(promises);
};

export default { saveImage, saveImages, deleteImage, deleteImages };
