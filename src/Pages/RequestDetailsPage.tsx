import { Box, Text } from "@chakra-ui/react";
import useRequest from "../hooks/useRequest";
import MediaQuery from "../components/MediaQuery";
import PageContainer from "../components/PageContainer";

const RequestDetailsPage = () => {
  const {
    request: { author, category, description, title },
  } = useRequest();

  return (
    <PageContainer>
      <Box marginY={2}>
        <MediaQuery user={author} size="md" />
      </Box>
      <Text fontWeight="bold" marginBottom={1}>
        {title}
      </Text>
      <Text>{description}</Text>
      <Text
        fontStyle="italic"
        fontSize="sm"
        color="orange.400"
        textAlign="center"
      >
        {category.label}
      </Text>
    </PageContainer>
  );
};

export default RequestDetailsPage;
