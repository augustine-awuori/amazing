import { Selector } from "../../common";
import useProductTypes, { ProductType } from "../../../hooks/useProductTypes";

export interface ShopTypeSelectorProps {
  onSelectType: (type: ProductType) => void;
  selectedType: ProductType | null;
}

const ShopTypeSelector = ({
  onSelectType,
  selectedType,
}: ShopTypeSelectorProps) => {
  const { types } = useProductTypes();

  return (
    <Selector
      data={types}
      name="Types"
      onSelectItem={onSelectType}
      selectedItem={selectedType}
    />
  );
};

export default ShopTypeSelector;
