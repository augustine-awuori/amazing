import { Button } from "@chakra-ui/react";
import { FieldValues } from "react-hook-form";

interface Props {
  isLoading: boolean;
  label: string;
  // onClick: (info: FieldValues) => void;
}

const FormSubmitButton = ({ isLoading, label, onClick }: Props) => (
  <Button
    isLoading={isLoading}
    colorScheme="orange"
    width="100px"
    type="submit"
  >
    {label}
  </Button>
);

export default FormSubmitButton;
