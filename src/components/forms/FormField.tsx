import { FieldError } from "react-hook-form";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

import ErrorMessage from "./ErrorMessage";

interface Props {
  error: FieldError | undefined;
  label: string;
  name: string;
}

const FormTextInput = ({ error, name, label, ...otherProps }: Props) => (
  <FormControl marginBottom={4}>
    <FormLabel>{label}</FormLabel>
    <Input type={name} placeholder={label} {...otherProps} />
    <ErrorMessage error={error?.message} visible={error} />
  </FormControl>
);

export default FormTextInput;
