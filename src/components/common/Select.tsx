import { Select } from "@chakra-ui/react";

import { FormRegister } from "../../hooks/useForm";
import { Item } from "./Selector";

interface Props {
  label: string;
  options: Item[];
  register: FormRegister;
}

const AppSelect = ({ label, options = [], register }: Props) => (
  <Select
    placeholder={`Select ${label}`}
    {...register(label.toLowerCase())}
    mt={3}
  >
    {options
      .filter((option) => option._id)
      .map((option, index) => (
        <option value={option._id} key={index}>
          {option.label}
        </option>
      ))}
  </Select>
);

export default AppSelect;
