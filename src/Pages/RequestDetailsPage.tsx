import { Box, HStack, Text } from "@chakra-ui/react";
import useRequest from "../hooks/useRequest";
import MediaQuery from "../components/MediaQuery";
import PageContainer from "../components/PageContainer";
import useTimestamp from "../hooks/useTimestamp";

const RequestDetailsPage = () => {
  const { request } = useRequest();
  const { tempTimestamp } = useTimestamp(request?.timestamp);

  return (
    <PageContainer>
      <Box marginY={2}>
        <MediaQuery user={request?.author} size="md" />
      </Box>
      <HStack>
        <Text fontWeight="bold" marginBottom={1}>
          {request?.title}
        </Text>
        <Text  fontStyle="italic">
          {tempTimestamp}
        </Text>
      </HStack>
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
