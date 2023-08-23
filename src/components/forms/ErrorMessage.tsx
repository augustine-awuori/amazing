import { Text } from "@chakra-ui/react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface Props {
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  visible?: FieldError | undefined | string;
}

export default function ErrorMessage({ error, visible }: Props) {
  return visible ? <Text color="tomato">{error}</Text> : null;
}
