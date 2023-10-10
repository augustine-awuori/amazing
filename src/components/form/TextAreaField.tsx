import { ChangeEvent } from "react";
import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";

import { FormRegister } from "../../hooks/useForm";
import ErrorMessage, { AppFieldError } from "./ErrorMessage";

interface Props {
  error: AppFieldError | undefined;
  label: string;
  placeholder?: string;
  name?: string;
  register: FormRegister;
  onChange?: (value: string) => void | undefined;
  value?: string | number | readonly string[] | undefined;
}

const TextAreaField = ({
  error,
  name,
  placeholder,
  label,
  register,
  value,
  onChange,
  ...otherProps
}: Props) => {
  const inputName = name || label.toLowerCase();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) onChange(e.target.value);
  };

  return (
    <FormControl marginBottom={4}>
      <FormLabel fontFamily="andika">{label}</FormLabel>
      <Textarea
        fontFamily="andika"
        placeholder={placeholder || label}
        {...register(inputName)}
        {...otherProps}
        onChange={handleChange}
        value={value}
      />
      <ErrorMessage error={error?.message} visible={error} />
    </FormControl>
  );
};

export default TextAreaField;
