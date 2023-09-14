import { Select } from "@chakra-ui/react";

import { Item } from "./Selector";

interface Props {
  label: string;
  options: Item[];
  register: any;
}

export default ({ label, options = [], register }: Props) => (
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
