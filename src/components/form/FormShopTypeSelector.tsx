import { useShops } from "../../hooks";
import Select from "../../components/common/Select";

interface Props {
  register: any;
}

const FormShopTypeSelector = ({ register }: Props) => {
  const { types } = useShops();

  return <Select label="Shop Type" options={types} register={register} />;
};

export default FormShopTypeSelector;
