import { useEffect } from "react";
import { Box } from "@chakra-ui/react";

import {
  CalloutBlock,
  DomainBlock,
  FeatureBlock,
  Footer,
  Hero,
} from "../components/about";
import useColumn from "../hooks/useColumn";

const AboutAppPage = () => {
  const { resetColumn, setColumn } = useColumn();

  useEffect(() => {
    setColumn("");

    return () => resetColumn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box backgroundColor="white">
      <Hero />
      <DomainBlock />
      <FeatureBlock />
      <CalloutBlock />
      <Footer />
    </Box>
  );
};

export default AboutAppPage;
