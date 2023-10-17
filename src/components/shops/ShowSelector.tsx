import { Item } from "../common/Selector";
import { Selector } from "../common";

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

const ShowSelector = ({ name, ...otherProps }: Props) => (
  <Selector data={filters} {...otherProps} name={`Show: ${name}`} />
);

export default ShowSelector;
