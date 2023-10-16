import { Item } from "../common/Selector";
import { Selector } from "../common";

const filters: Item[] = [
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
