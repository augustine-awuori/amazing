import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

import ErrorMessage from "./ErrorMessage";

interface Props {
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  label: string;
  placeholder?: string;
  name?: string;
  register: any;
}

const FormField = ({
  error,
  name,
  placeholder,
  label,
  register,
  ...otherProps
}: Props) => {
  const inputName = name || label.toLowerCase();

  return (
    <FormControl marginBottom={4}>
      <FormLabel>{label}</FormLabel>
      <Input
        type={inputName}
        placeholder={placeholder || label}
        {...register(inputName)}
        {...otherProps}
      />
      <ErrorMessage error={error?.message} visible={error} />
    </FormControl>
  );
};

export default FormField;
