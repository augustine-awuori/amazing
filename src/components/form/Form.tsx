import { Box } from "@chakra-ui/react";

import ErrorMessage from "./ErrorMessage";
import PageContainer from "../PageContainer";
import Text from "../../components/Text";

interface Props {
  children: any;
  error?: string;
  handleSubmit: any;
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
