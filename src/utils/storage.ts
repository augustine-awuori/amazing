import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyCAtitgurCoK8LIYRWfo2i95Q6otoTmXSA",
  authDomain: "kisii-campus-mart-site.firebaseapp.com",
  projectId: "kisii-campus-mart-site",
  storageBucket: "kisii-campus-mart-site.appspot.com",
  messagingSenderId: "66759292374",
  appId: "1:66759292374:web:2a09e7ad0919c6a056e077",
  measurementId: "G-C2MJ2XQDCQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const saveImage = async (image: File) => {
  const result = await uploadBytes(ref(storage, v4()), image, {
    contentType: image.type,
  });

  return await getDownloadURL(result.ref);
};

export const saveImages = (images: File[]) => {
  const promises = images.map(async (image) => await saveImage(image));

  return Promise.all(promises);
};
