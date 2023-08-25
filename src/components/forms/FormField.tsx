import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import ErrorMessage from "./ErrorMessage";

interface Props {
  error: any | undefined;
  label: string;
  placeholder?: string;
  name?: string;
  register: any;
  value?: any;
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
  ...otherProps
}: Props) => {
  const inputName = name || label.toLowerCase();

  return (
    <FormControl marginBottom={4}>
      <FormLabel>{label}</FormLabel>
      <Input
        type={type}
        placeholder={placeholder || label}
        {...register(inputName)}
        {...otherProps}
        value={value}
      />
      <ErrorMessage error={error?.message} visible={error} />
    </FormControl>
  );
};

export default FormField;
