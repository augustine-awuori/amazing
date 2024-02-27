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
      "Empower users to showcase and sell their products hassle-free. Whether it's a collection of items or a brand to establish, creating a shop is easy. Provide essential details like shop name, type, location, and an image, and let your products shine on the home page!",
    heading: "An Online Shop",
    image: shopImage,
    url: "/shops/new",
  },
  {
    description:
      "Simplify the process of buying, selling, or exchanging items with detailed listings. A 'listing' offers a comprehensive description or advertisement of an item users want to sell, exchange, or give away. Showcase what you have available with all the relevant information for potential buyers or interested parties.",
    heading: "A Listing",
    image: listingImage,
    url: "/listings/new",
  },
  {
    description:
      "Fulfill specific item requests hassle-free. The 'Request' feature allows users to express their needs, even for items not listed. It's like making a wish and watching it come true! Others can respond with relevant listings, making the process seamless and enjoyable for everyone.",
    heading: "A Request",
    image: requestImage,
    imageHeight: "70%",
    url: "/requests/new",
  },
];
