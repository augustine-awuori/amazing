import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

import { FormHandleSubmit } from "../../hooks/useForm";
import ErrorMessage from "./ErrorMessage";
import PageContainer from "../PageContainer";
import Text from "../Text";

interface Props {
  children: ReactNode;
  error?: string;
  handleSubmit: FormHandleSubmit;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: any) => void;
  title?: string;
  usePageContainer?: boolean;
}

const Form = ({
  error,
  children,
  handleSubmit,
  onSubmit,
  title,
  usePageContainer = true,
}: Props) => {
  const Container = usePageContainer ? PageContainer : Box;

  return (
    <Container>
      <Box my={4} textAlign="left" maxW="500px">
        <form onSubmit={handleSubmit(onSubmit)}>
          {title && (
            <Text fontWeight="bold" fontSize="2xl" marginY={3}>
              {title}
            </Text>
          )}
          <ErrorMessage error={error} visible={error} />
          {children}
        </form>
      </Box>
    </Container>
  );
};

export default Form;
