import { Box, Text } from "@chakra-ui/react";

import { User } from "../../hooks/useUser";
import ErrorMessage from "./ErrorMessage";
import PageContainer from "../PageContainer";

interface Props {
  children: any;
  error?: string;
  handleSubmit: any;
  onSubmit: (values: any) => void;
  title: string;
}

const Form = ({ error, children, handleSubmit, onSubmit, title }: Props) => (
  <PageContainer>
    <Box my={4} textAlign="left" maxW="500px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text fontWeight="bold" fontSize="2xl" marginY={3}>
          {title}
        </Text>
        <ErrorMessage error={error} visible={error} />
        {children}
      </form>
    </Box>
  </PageContainer>
);

export default Form;
