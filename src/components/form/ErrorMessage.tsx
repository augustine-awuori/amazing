import { FieldError } from "react-hook-form";

import Text from "../../components/Text";

interface Props {
  error: any | undefined;
  visible?: FieldError | undefined | string;
}

export default function ErrorMessage({ error, visible }: Props) {
  return visible ? <Text color="tomato">{error}</Text> : null;
}
