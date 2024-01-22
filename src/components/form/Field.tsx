import { ChangeEvent, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

import { fontFamily } from "../../data/typography";
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
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const inputName = name || label.toLowerCase();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
  };

  const togglePasswordVisibility = () =>
    setPasswordVisibility(!isPasswordVisible);

  return (
    <FormControl marginBottom={4}>
      <FormLabel fontFamily={fontFamily}>{label}</FormLabel>
      <InputGroup>
        <Input
          fontFamily={fontFamily}
          type={isPasswordVisible ? "text" : type}
          placeholder={placeholder || label}
          {...register(inputName)}
          onChange={handleChange}
          {...otherProps}
          value={value}
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
