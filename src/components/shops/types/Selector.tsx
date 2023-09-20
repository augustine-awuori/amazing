import { Selector } from "../../common";
import useTypes, { Type } from "../../../hooks/useTypes";

export interface ShopTypeSelectorProps {
  onSelectType: (type: Type) => void;
  selectedType: Type | null;
}

const ShopTypeSelector = ({
  onSelectType,
  selectedType,
}: ShopTypeSelectorProps) => {
  const { types } = useTypes();

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
