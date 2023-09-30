import { FormRegister } from "../../hooks/useForm";
import Select from "../common/Select";
import useTypes from "../../hooks/useTypes";

interface Props {
  register: FormRegister;
}

const FormShopTypeSelector = ({ register }: Props) => {
  const { types } = useTypes();

  return <Select label="Type" options={types} register={register} />;
};

export default FormShopTypeSelector;
