import Selector, { Item } from "../common/Selector";

interface FilterItem extends Item {
  _id: "products" | "shops";
  label: "Products" | "Shops";
}

const filters: FilterItem[] = [
  { _id: "products", label: "Products" },
  { _id: "shops", label: "Shops" },
];

interface Props {
  name: string;
  onSelectItem: (item: Item) => void;
  selectedItem: Item | null;
}

const ShowSelector = ({ ...otherProps }: Props) => (
  <Selector data={filters} {...otherProps} />
);

export default ShowSelector;
