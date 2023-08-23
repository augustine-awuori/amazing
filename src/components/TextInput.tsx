import { Input } from "@chakra-ui/react";

interface Props {
  placeholder?: string;
  type?: string;
}

const TextInput = ({
  placeholder = "",
  type = "text",
  ...otherProps
}: Props) => {
  return (
    <Input
      pr="4.5rem"
      type={type}
      placeholder={placeholder}
      maxWidth="400px"
      display="block"
      variant="filled"
      {...otherProps}
    />
  );
};

export default TextInput;
