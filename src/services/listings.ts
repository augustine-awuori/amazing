import { Listing, ListingInfo } from "../hooks/useListing";
import client from "./client";

export const endpoint = "/listings";

const empty = () => {};

const addListing = (listing: Listing, onUploadProgress = empty) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("price", listing.price.toString());
  data.append("categoryId", listing.category._id);
  data.append("description", listing.description);
  listing.images.forEach((image) => data.append("images", image));

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const getListings = () => client.get(endpoint);

const updateListing = (listing: ListingInfo, onUploadProgress = empty) => {
  const { _id, authorId, title, price, description, category } = listing;
  const data = {
    _id,
    authorId,
    title,
    price,
    description,
    categoryId: category._id,
  };

  return client.patch(`${endpoint}/${listing._id}`, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

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
