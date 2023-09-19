import { Box, Button } from "@chakra-ui/react";

interface Props {
  isLoading: boolean;
  label: string;
}

const SubmitButton = ({ isLoading, label }: Props) => (
  <Box marginTop={5}>
    <Button width="full" type="submit" isLoading={isLoading}>
      {label}
    </Button>
  </Box>
);

export default SubmitButton;
