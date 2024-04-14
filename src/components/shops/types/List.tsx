import { GridAsideList } from "../../common";
import { ShopTypeSelectorProps as Props } from "./Selector";
import useProductTypes from "../../../hooks/useProductTypes";

const TypeList = ({ onSelectType, selectedType }: Props) => {
  const { types, isLoading } = useProductTypes();

  return (
    <GridAsideList
      heading="Types"
      isLoading={isLoading}
      items={types}
      onSelectItem={onSelectType}
      selectedItem={selectedType}
    />
  );
};

export default TypeList;
