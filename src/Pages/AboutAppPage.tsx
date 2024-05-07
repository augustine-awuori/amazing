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

const AboutAppPage = () => {
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
