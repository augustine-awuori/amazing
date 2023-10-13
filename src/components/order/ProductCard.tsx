import ProductCard, { Product } from "../shops/product/Card";

interface Props {
  product: Product;
}

const OrderProductCard = ({ product }: Props) => (
  <ProductCard
    data={product}
    onClick={() => {}}
    onEdit={() => {}}
    onQuantityDecrease={() => {}}
    onQuantityIncrease={() => {}}
  />
);

export default OrderProductCard;
