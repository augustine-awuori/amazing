import { FormEvent } from "react";
import { Box, Text } from "@chakra-ui/react";

interface Props {
  children: any;
  onSubmit: (values: FormEvent) => void;
  title: string;
}

const Form = ({ children, onSubmit, title }: Props) => (
  <Box my={4} textAlign="left" maxW="500px">
    <form onSubmit={onSubmit}>
      <Text fontWeight="bold" fontSize="2xl" marginY={3}>
        {title}
      </Text>
      {children}
    </form>
  </Box>
);

export default Form;
