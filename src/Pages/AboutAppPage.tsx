import { Box } from "@chakra-ui/react";

import {
  CalloutBlock,
  DomainBlock,
  FAQBlock,
  FeatureBlock,
  Footer,
  Hero,
} from "../components/about";
import ScrollToTop from "../components/common/ScrollToTopBtn";
import useNoGrid from "../hooks/useNoGrid";

const AboutAppPage = () => {
  useNoGrid();

  return (
    <Box backgroundColor="#fff">
      <ScrollToTop />
      <Hero />
      <DomainBlock />
      <FeatureBlock />
      <FAQBlock />
      <CalloutBlock />
      <Footer />
    </Box>
  );
};

export default AboutAppPage;
