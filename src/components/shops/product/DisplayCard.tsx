import { Listing } from "../../../hooks/useListing";
import { ListingCard } from "../../../components";
import { MediaQueryUser } from "../../../components/common/MediaQuery";
import { Product } from "./Card";
import empty from "../../../utils/empty";

interface Props {
  product: Product;
  onClick: (shopId: string) => void;
}

const DisplayCard = ({ onClick, product }: Props) => {
  const { _id, image, price, name, shop, timestamp, description } =
    product || empty.product;

  const author: MediaQueryUser = {
    avatar: shop?.image || "",
    isVerified: shop?.isVerified || false,
    name: shop?.name || "",
  };

  const listing: Listing = {
    _id,
    author,
    category: { _id: "", label: "Unknown" },
    images: [image],
    price,
    title: name,
    timestamp,
    description,
  };

  return <ListingCard listing={listing} onClick={() => onClick(shop._id)} />;
};

export default DisplayCard;
