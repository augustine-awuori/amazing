import listingImage from "../assets/listing.png";
import requestImage from "../assets/quotes.png";
import shopImage from "../assets/shop.jpg";

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
      "Users with multiple items to sell or those looking to establish their brand can create a shop. Provide details like shop name, type, location, and an image. Your products will now shine on the home page!",
    heading: "An Online Shop",
    image: shopImage,
    url: "/shops/new",
  },
  {
    description:
      "A 'listing' is a detailed description or advertisement of an item users want to sell, exchange, or give away. Showcase what you have available with all the relevant information for potential buyers or interested parties.",
    heading: "A Listing",
    image: listingImage,
    url: "/listings/new",
  },
  {
    description:
      "The 'Request' feature allows users to make specific item requests, even if those items aren't listed. Express your needs, and others can respond with relevant listings. It's like making a wish and watching it come true!",
    heading: "A Request",
    image: requestImage,
    imageHeight: "70%",
    url: "/requests/new",
  },
];
