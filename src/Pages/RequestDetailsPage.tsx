import { Box, Text } from "@chakra-ui/react";
import useRequest from "../hooks/useRequest";
import MediaQuery from "../components/MediaQuery";
import PageContainer from "../components/PageContainer";

const RequestDetailsPage = () => {
  const { request } = useRequest();

  return (
    <PageContainer>
      <Box marginY={2}>
        <MediaQuery user={request?.author} size="md" />
      </Box>
      <Text fontWeight="bold" marginBottom={1}>
        {request?.title}
      </Text>
      <Text>{request?.description}</Text>
      <Text
        fontStyle="italic"
        fontSize="sm"
        color="orange.400"
        textAlign="center"
      >
        {request?.category.label}
      </Text>
    </PageContainer>
  );
};

export default RequestDetailsPage;
