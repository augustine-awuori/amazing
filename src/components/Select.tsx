import { Select } from "@chakra-ui/react";

interface Option {
  _id: string;
  label: string;
}

interface Props {
  label: string;
  options: Option[];
  register: any;
}

export default ({ label, options = [], register }: Props) => (
  <Select placeholder={`Select ${label}`} {...register(label.toLowerCase())}>
    {options.map((option, index) => (
      <option value={option._id} key={index}>
        {option.label}
      </option>
    ))}
  </Select>
);
