import { GridAsideList } from "../../common";
import { ShopTypeSelectorProps as Props } from "./Selector";
import useShops from "../../../hooks/useShops";

const TypeList = ({ onSelectType, selectedType }: Props) => {
  const { types } = useShops();

  return (
    <GridAsideList
      heading="Types"
      isLoading={false}
      items={types}
      onSelectItem={onSelectType}
      selectedItem={selectedType}
    />
  );
};

export default TypeList;
