import { SelectProps } from "@chakra-ui/react";

import { FormRegister } from "../../hooks/useForm";
import Select from "../common/Select";
import useTypes from "../../hooks/useTypes";

interface Props extends SelectProps {
  register: FormRegister;
}

const FormShopTypeSelector = ({ register, ...otherProps }: Props) => {
  const { types } = useTypes();

  return (
    <Select {...otherProps} label="Type" options={types} register={register} />
  );
};

export default FormShopTypeSelector;
