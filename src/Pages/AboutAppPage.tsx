import { Text } from "@chakra-ui/react";

import PageContainer from "../components/PageContainer";
import Paragraph from "../components/Paragraph";

const AboutAppPage = () => (
  <PageContainer>
    <Text textAlign="center" fontWeight="bold" fontSize="3xl" marginTop={2}>
      Introducing the Kisii University Student App – Your Gateway to Seamless
      Campus Connections!
    </Text>
    <Paragraph>
      Welcome to Kisii Universe Mart, the platform where Kisii University
      students come together to connect and engage in various activities,
      including buying and selling items online. Our app is born out of the need
      to bridge the gap that platforms like WhatsApp couldn't fill – a place
      where all students can easily connect.
    </Paragraph>
    <Paragraph>
      As a student-centric platform, we understand the importance of community
      and support in your journey. With Kisii Universe Mart, you have the
      opportunity to not only explore the academic realm but also tap into your
      entrepreneurial potential. Our app allows you to start a business without
      the need for a physical store, save on overhead costs, and increase your
      visibility within the university network.
    </Paragraph>
    <Paragraph>
      We acknowledge that our app is a work in progress, and we're dedicated to
      continuously improving it. We invite all students who share our vision to
      join us and contribute in any way, be it through programming skills or
      valuable insights. Reach out to us on WhatsApp at +254745889801.
    </Paragraph>
    <Paragraph>
      Let's reshape the future of Kisii University together – where
      connectivity, collaboration, and growth go hand in hand. Join us in
      building a vibrant community that supports both education and
      entrepreneurship.
    </Paragraph>
  </PageContainer>
);

export default AboutAppPage;
