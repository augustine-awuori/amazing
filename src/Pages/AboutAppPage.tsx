import {
  Footer,
  PageContainer,
  Paragraph,
  StartChatBtn,
  Text,
} from "../components";
import useAppColorMode from "../hooks/useAppColorMode";

const AboutAppPage = () => {
  const { accentColor } = useAppColorMode();

  return (
    <PageContainer>
      <Text
        textAlign="center"
        fontWeight="bold"
        fontSize="2xl"
        marginTop={2}
        marginBottom={5}
      >
        Kisii University Students' Business App
      </Text>
      <Text fontSize="xl" fontWeight="600" color={accentColor}>
        Get access to the market faster and easer than ever before
      </Text>
      <Paragraph>
        Welcome to Kisii Universe Mart, the platform where all Kisii University
        Businesses come together to serve their fellow comrades.
      </Paragraph>
      <Paragraph>
        Whether you have a shop or you just want to sell/buy one-time thing this
        is a place for you.
      </Paragraph>
      <Paragraph>
        We acknowledge that our app is a work in progress, and we're dedicated
        to continuously improving it. We invite all students who share our
        vision to join us and contribute in any way, be it through programming
        skills or valuable insights.
      </Paragraph>
      <Paragraph>
        Let's reshape the future of Kisii University together – where
        connectivity, collaboration, and growth go hand in hand. Join us in
        building a vibrant community that supports both education and
        entrepreneurship.
      </Paragraph>
      <Paragraph>
        Join us in building a vibrant community that supports both education and
        entrepreneurship.
      </Paragraph>
      <Footer name="Baby Softwares">
        <StartChatBtn phoneNumber="254745889801" />
      </Footer>
    </PageContainer>
  );
};

export default AboutAppPage;
