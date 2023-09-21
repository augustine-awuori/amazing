import { Box, Button } from "@chakra-ui/react";

interface Props {
  isLoading: boolean;
  label: string;
}

const SubmitButton = ({ isLoading, label }: Props) => (
  <Box marginTop={5}>
    <Button
      width="full"
      type="submit"
      isLoading={isLoading}
      bgColor="orange.300"
      _hover={{ bgColor: "orange.400" }}
    >
      {label}
    </Button>
  </Box>
);

export default SubmitButton;
