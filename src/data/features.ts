import listing from "../assets/listing.png";
import request from "../assets/quotes.png";
import shop from "../assets/shop.jpg";

export interface Feature {
  description: string;
  heading: string;
  image: string;
  imageHeight?: string;
  url: string;
}

export const features: Feature[] = [
  {
    description:
      "Users who have multiple items to sell or want to establish their brand on the platform can create a shop. This involves providing details such as shop name, type, location, and possibly an image representing the shop. Your products will now appear on the home page",
    heading: "An Online Shop",
    image: shop,
    url: "/shops/new",
  },
  {
    description:
      "A 'listing' refers to a detailed description or advertisement of a specific item that a user wants to sell, exchange, or give away. It serves as a way for users to showcase what they have available, providing relevant information to potential buyers or interested parties.",
    heading: "A Listing",
    image: listing,
    url: "/listings/new",
  },
  {
    description:
      "The 'Request' feature allows users to make requests for specific items they are looking for, even if those items are not currently listed in the marketplace. It provides a way for users to express their needs, and other users or sellers can respond to these requests by posting relevant listings.",
    heading: "A Request",
    image: request,
    imageHeight: "70%",
    url: "/requests/new",
  },
];
