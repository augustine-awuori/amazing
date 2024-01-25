import { ListingInfo, NewListingInfo } from "../hooks/useListing";
import client from "./client";

export const endpoint = "/listings";

const addListing = (
  listing: NewListingInfo,
  onUploadProgress: (progress: number) => void = () => {}
) =>
  client.post(endpoint, listing, {
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total !== null && progressEvent.total !== undefined) {
        const progress = (progressEvent.loaded / progressEvent.total) * 100;
        onUploadProgress(progress);
      }
    },
  });

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
