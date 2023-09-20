import { GridAsideList } from "../../common";
import { ShopTypeSelectorProps as Props } from "./Selector";
import useTypes from "../../../hooks/useTypes";

const TypeList = ({ onSelectType, selectedType }: Props) => {
  const { types, isLoading } = useTypes();

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
