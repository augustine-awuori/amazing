import { Box } from "@chakra-ui/react";

import {
  CalloutBlock,
  DomainBlock,
  FeatureBlock,
  Footer,
  Hero,
} from "../components/about";
import ScrollToTop from "../components/common/ScrollToTopBtn";
import useNoGrid from "../hooks/useNoGrid";

const AboutAppPage = () => {
  useNoGrid();

  return (
    <Box backgroundColor="white">
      <ScrollToTop />
      <Hero />
      <DomainBlock />
      <FeatureBlock />
      <CalloutBlock />
      <Footer />
    </Box>
  );
};

export default AboutAppPage;
