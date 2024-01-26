import { ChangeEvent, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  InputProps,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { fontFamily } from "../../data/typography";
import { FormRegister } from "../../hooks/useForm";
import ErrorMessage, { AppFieldError } from "./ErrorMessage";

interface Props extends InputProps {
  error: AppFieldError | undefined;
  label: string;
  register: FormRegister;
  onChangeText?: (value: string) => void | undefined;
}

const FormField = ({
  error,
  name,
  placeholder,
  label,
  register,
  type = "text",
  onChangeText,
  ...otherProps
}: Props) => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const inputName = name || label.toLowerCase();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChangeText?.(e.target.value);

  const togglePasswordVisibility = () =>
    setPasswordVisibility(!isPasswordVisible);

  return (
    <FormControl marginBottom={4}>
      <FormLabel fontFamily={fontFamily}>{label}</FormLabel>
      <InputGroup>
        <Input
          {...otherProps}
          {...register(inputName)}
          fontFamily={fontFamily}
          onChange={handleChange}
          placeholder={placeholder || label}
        />
        {type === "password" && (
          <InputRightElement>
            <IconButton
              size="sm"
              aria-label={isPasswordVisible ? "Hide Password" : "Show Password"}
              icon={isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              onClick={togglePasswordVisibility}
            />
          </InputRightElement>
        )}
      </InputGroup>
      <ErrorMessage error={error?.message} visible={error} />
    </FormControl>
  );
};

export default FormField;
