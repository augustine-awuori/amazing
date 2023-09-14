import { Selector } from "../../common";
import { Type } from "../../../hooks/useShop";
import useShops from "../../../hooks/useShops";

export interface ShopTypeSelectorProps {
  onSelectType: (type: Type) => void;
  selectedType: Type | null;
}

const ShopTypeSelector = ({
  onSelectType,
  selectedType,
}: ShopTypeSelectorProps) => {
  const { types } = useShops();

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
