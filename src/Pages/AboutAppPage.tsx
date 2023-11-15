import { useEffect } from "react";
import { Box } from "@chakra-ui/react";

import {
  CalloutBlock,
  DomainBlock,
  FeatureBlock,
  Footer,
  Hero,
} from "../components/about";
import useGridController from "../hooks/useGridController";

const AboutAppPage = () => {
  const { removeAsideGrid, resetGrid } = useGridController();

  useEffect(() => {
    removeAsideGrid();

    return () => resetGrid();
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
