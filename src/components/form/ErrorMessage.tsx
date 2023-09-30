import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
} from "react-hook-form";

import Text from "../../components/Text";

export type AppFieldError =
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<FieldValues>>;

interface Props {
  error: AppFieldError | string | undefined;
  visible?: AppFieldError | string | undefined;
}

export default function ErrorMessage({ error, visible }: Props) {
  return visible ? <Text color="tomato">{error?.toString()}</Text> : null;
}
