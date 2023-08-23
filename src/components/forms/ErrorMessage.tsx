import { Text } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

interface Props {
  error: any;
  visible?: FieldError | undefined | string;
}

export default function ErrorMessage({ error, visible }: Props) {
  return visible ? <Text color="tomato">{error}</Text> : null;
}
