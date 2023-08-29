import { useNavigate } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

import { MediaQuery, PageContainer } from "../components";
import { useAppColorMode, useRequest, useTimestamp } from "../hooks";

const RequestDetailsPage = () => {
  const { accentColor } = useAppColorMode();
  const { request } = useRequest();
  const { tempTimestamp } = useTimestamp(request?.timestamp);
  const navigate = useNavigate();

  const navigateToProfile = () => navigate(`/profile/${request?.author._id}`);

  return (
    <PageContainer>
      <Box marginY={2}>
        <MediaQuery
          user={request?.author}
          size="md"
          time={tempTimestamp}
          onClick={navigateToProfile}
        />
      </Box>
      <Text fontWeight="bold" marginBottom={1}>
        {request?.title}
      </Text>
      <Text>{request?.description}</Text>
      <Text
        fontStyle="italic"
        fontSize="sm"
        color={accentColor}
        textAlign="center"
      >
        {request?.category.label}
      </Text>
    </PageContainer>
  );
};

export default RequestDetailsPage;
