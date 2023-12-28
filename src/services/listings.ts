import { ListingInfo, NewListingInfo } from "../hooks/useListing";
import client from "./client";

export const endpoint = "/listings";

const addListing = (
  listing: NewListingInfo,
  onUploadProgress: (progress: number) => void = () => {}
) => {
  const { category, description, images, price, title } = listing;

  const data = new FormData();
  data.append("title", title);
  data.append("price", price.toString());
  data.append("category", category);
  data.append("description", description);
  images.forEach((image) => data.append("images", image));

  return client.post(endpoint, data, {
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total !== null && progressEvent.total !== undefined) {
        const progress = (progressEvent.loaded / progressEvent.total) * 100;
        onUploadProgress(progress);
      }
    },
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const getListings = () => client.get(endpoint);

const updateListing = (
  listing: ListingInfo,
  onUploadProgress: (progress: number) => void = () => {}
) =>
  client.patch(`${endpoint}/${listing._id}`, listing, {
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total !== null && progressEvent.total !== undefined) {
        const progress = (progressEvent.loaded / progressEvent.total) * 100;
        onUploadProgress(progress);
      }
    },
  });

const deleteListing = (listingId: string) =>
  client.delete(`${endpoint}/${listingId}`);

const getUserListings = (userId: string) => client.get(`${endpoint}/${userId}`);

const getListing = (listingId: string) =>
  client.get(`${endpoint}/${listingId}`);

const convertToShopProduct = (listingId: string, shopId: string) =>
  client.post(`${endpoint}/to-product/${listingId}`, { shop: shopId });

export default {
  addListing,
  convertToShopProduct,
  deleteListing,
  getListing,
  getListings,
  getUserListings,
  updateListing,
};
