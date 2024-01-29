import { ReactNode, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

import { FormHandleSubmit } from "../../hooks/useForm";
import { Modal, PageContainer, Text } from "../";
import { getLastWord } from "../../utils/format";
import ErrorMessage from "./ErrorMessage";

interface Props {
  children: ReactNode;
  error?: string;
  explanation?: string;
  handleSubmit: FormHandleSubmit;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: any) => void;
  title?: string;
  usePageContainer?: boolean;
}

const Form = ({
  error,
  explanation,
  children,
  handleSubmit,
  onSubmit,
  title,
  usePageContainer = true,
}: Props) => {
  const [showExplanation, setExplanation] = useState(false);

  const Container = usePageContainer ? PageContainer : Box;

  const handleModalVisibility = () => setExplanation(!showExplanation);

  return (
    <Container>
      <Modal
        content={explanation}
        isOpen={showExplanation}
        onModalClose={handleModalVisibility}
        title={`${getLastWord(title)} Explanation`}
        onPrimaryClick={handleModalVisibility}
        primaryBtnLabel="Understood"
      />
      <Box
        my={4}
        textAlign="left"
        maxW="400px"
        mx="auto"
        w={{ sm: "100%" }}
        mt={{ base: 7 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex align="center" justify="space-between">
            {title && (
              <Text fontWeight="bold" fontSize="2xl" my={3}>
                {title}
              </Text>
            )}
            <Text
              color="orange.400"
              cursor="pointer"
              onClick={handleModalVisibility}
            >
              {getLastWord(title)}?
            </Text>
          </Flex>
          <ErrorMessage error={error} visible={error} />
          {children}
        </form>
      </Box>
    </Container>
  );
};

export default Form;
