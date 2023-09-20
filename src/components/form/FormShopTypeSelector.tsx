import Select from "../../components/common/Select";
import useTypes from "../../hooks/useTypes";

interface Props {
  register: any;
}

const FormShopTypeSelector = ({ register }: Props) => {
  const { types } = useTypes();

  return <Select label="Type" options={types} register={register} />;
};

export default FormShopTypeSelector;
