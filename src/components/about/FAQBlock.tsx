import { Box } from "@chakra-ui/react";

import { FAQs } from "../../data/FAQs";
import { Heading } from "../../components";
import colors from "../config/colors";
import FAQItem from "../../components/common/FAQItem";

const FAQBlock = () => (
  <Box mb={75} mx={{ base: 5 }}>
    <Heading color={colors.blue} textAlign="center" mb={5}>
      Frequently Asked Questions
    </Heading>
    {FAQs.map((item) => (
      <FAQItem {...item} />
    ))}
  </Box>
);

export default FAQBlock;
