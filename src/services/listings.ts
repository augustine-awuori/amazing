import { Listing, ListingInfo } from "../hooks/useListing";
import client from "./client";

export const endpoint = "/listings";

const addListing = (
  listing: Listing,
  onUploadProgress: (progress: number) => void = () => {}
) => {
  const data = new FormData();
  data.append("title", listing.title);
  if (listing.price) data.append("price", listing.price.toString());
  data.append("categoryId", listing.category._id);
  data.append("description", listing.description);
  listing.images.forEach((image) => data.append("images", image));

  return client.post(endpoint, data, {
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total !== null && progressEvent.total !== undefined) {
        const progress = (progressEvent.loaded / progressEvent.total) * 100;
        onUploadProgress(progress);
      }
    },
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

export default {
  addListing,
  deleteListing,
  getListing,
  getListings,
  getUserListings,
  updateListing,
};
