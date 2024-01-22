import {
  FormControl,
  FormLabel,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";

import { fontFamily } from "../../data/typography";
import { FormRegister } from "../../hooks/useForm";
import ErrorMessage, { AppFieldError } from "./ErrorMessage";

interface Props extends TextareaProps {
  error: AppFieldError | undefined;
  label: string;
  placeholder?: string;
  name?: string;
  register: FormRegister;
  value?: string | number | readonly string[] | undefined;
}

const TextAreaField = ({
  error,
  name,
  placeholder,
  label,
  register,
  value,
  ...otherProps
}: Props) => {
  const inputName = name || label.toLowerCase();

  return (
    <FormControl marginBottom={4}>
      <FormLabel fontFamily={fontFamily}>{label}</FormLabel>
      <Textarea
        fontFamily={fontFamily}
        placeholder={placeholder || label}
        {...register(inputName)}
        {...otherProps}
        value={value}
      />
      <ErrorMessage error={error?.message} visible={error} />
    </FormControl>
  );
};

export default TextAreaField;
