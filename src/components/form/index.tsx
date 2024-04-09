import { ReactNode, useState } from "react";
import { Box, BoxProps, Flex } from "@chakra-ui/react";

import { FormHandleSubmit } from "../../hooks/useForm";
import { getLastWord } from "../../utils/format";
import { Modal, Text } from "../";
import { useNoGrid } from "../../hooks";
import ErrorMessage from "./ErrorMessage";

interface Props extends BoxProps {
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
  ...otherProps
}: Props) => {
  const [showExplanation, setExplanation] = useState(false);
  useNoGrid();

  const handleModalVisibility = () => setExplanation(!showExplanation);

  return (
    <Box pt={usePageContainer ? 15 : 0} px={{ base: 5 }} {...otherProps}>
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
            {explanation && (
              <Text
                color="orange.400"
                cursor="pointer"
                onClick={handleModalVisibility}
              >
                {getLastWord(title)}?
              </Text>
            )}
          </Flex>
          <ErrorMessage error={error} visible={error} />
          {children}
        </form>
      </Box>
    </Box>
  );
};

export default Form;
