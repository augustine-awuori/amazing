import { Text } from "@chakra-ui/react";

import PageContainer from "../components/PageContainer";

const NotReadyPage = () => {
  return (
    <PageContainer>
      <Text fontSize="4xl" marginBottom={3} marginTop={5}>
        Page not yet ready!
      </Text>
      <Text>🚧 **Under Construction: Image Upload Feature** 🚧</Text>
    </PageContainer>
  );
};

export default NotReadyPage;
