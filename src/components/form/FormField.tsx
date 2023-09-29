import { FormControl, FormLabel, Input } from "@chakra-ui/react";

import { FormRegister } from "../../hooks/useForm";
import ErrorMessage, { AppFieldError } from "./ErrorMessage";

interface Props {
  error: AppFieldError | undefined;
  label: string;
  placeholder?: string;
  name?: string;
  register: FormRegister;
  value?: string | number | readonly string[] | undefined;
  onChange?: (value: string) => void | undefined;
  type?: string;
}

const FormField = ({
  error,
  name,
  placeholder,
  label,
  register,
  value,
  type = "text",
  onChange,
  ...otherProps
}: Props) => {
  const inputName = name || label.toLowerCase();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
  };

  return (
    <FormControl marginBottom={4}>
      <FormLabel fontFamily="andika">{label}</FormLabel>
      <Input
        fontFamily="andika"
        type={type}
        placeholder={placeholder || label}
        {...register(inputName)}
        onChange={handleChange}
        {...otherProps}
        value={value}
      />
      <ErrorMessage error={error?.message} visible={error} />
    </FormControl>
  );
};

export default FormField;
