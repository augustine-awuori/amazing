import { useState } from "react";
import { Navigate } from "react-router-dom";

import { Button, Heading, PageContainer, Paragraph } from "../components";
import useAppColorMode from "../hooks/useAppColorMode";

const NotFoundPage = () => {
  const { accentColor, concAccentColor } = useAppColorMode();
  const [redirected, setRedirected] = useState(false);

  if (redirected) return <Navigate to="/" />;

  return (
    <PageContainer>
      <Heading>Page Not Found</Heading>
      <Paragraph color="orange.300">Status Code: 404</Paragraph>
      <Button
        onClick={() => setRedirected(true)}
        backgroundColor={accentColor}
        _hover={{ backgroundColor: concAccentColor }}
      >
        View Home Page
      </Button>
    </PageContainer>
  );
};

export default NotFoundPage;
