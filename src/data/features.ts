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
      "Experience the power of limitless reach, 24/7 accessibility, and seamless transactions – your shop, now thriving in the digital spotlight!",
    heading: "Online Shop",
    image: shop,
    url: "/shops/new",
  },
  {
    description:
      "Unlock a treasure trove of student-to-student deals! Items such as bed or chair",
    heading: "Listing",
    image: listing,
    url: "/listings/new",
  },
  {
    description:
      "When you're on the hunt for something special, and it's not there yet, just request it. Someone might just have it.",
    heading: "Request",
    image: request,
    imageHeight: "70%",
    url: "/requests/new",
  },
];
