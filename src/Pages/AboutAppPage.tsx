import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const getLink = (label: string, to: string) => (
    <Text
      color={accentColor}
      cursor="pointer"
      onClick={() => navigate(`/${to}`)}
      display="inline-flex"
    >
      {label}
    </Text>
  );

  return (
    <PageContainer>
      <Text
        textAlign="center"
        fontWeight="bold"
        fontSize="2xl"
        marginTop={2}
        marginBottom={5}
      >
        Unveiling the Kisii University Business App
      </Text>
      <Text fontSize="xl" fontWeight="600" color={accentColor}>
        Let's Dive In
      </Text>
      <Paragraph>
        Campus Mart isn't just another website; it's your digital playground at
        Kisii University. Imagine a place where you can explore a world of
        student activities. You can peek at other students' products, chat them
        up on WhatsApp if something catches your eye, and even showcase your own
        treasures.
      </Paragraph>
      <Text fontSize="xl" fontWeight="600" color={accentColor}>
        The Magic of Campus Mart
      </Text>
      <Paragraph>
        Let's rewind to the old ways. Shop owners would open their physical
        stores, hoping that passers-by would notice. But what if they didn't?
        How much can you show with a single glance? Can you risk it all on a
        fleeting moment?
      </Paragraph>
      <Paragraph>
        Well, guess what? Campus Mart transforms the game. Potential customers
        can now stroll through your products from the cozy corners of their
        homes. Even if you don't unlock your physical shop, your products are on
        display 24/7. When someone's interested, they can ping you on WhatsApp,
        just like that, using the phone number you signed up with.
      </Paragraph>
      <Text fontSize="large" fontWeight="600" color={accentColor}>
        Ready to Embark?
      </Text>
      <Paragraph>
        First, let others know who you are. Begin your journey by{" "}
        {getLink("Signing Up", "register")}. You can also create your very own{" "}
        {getLink("online shop", "shops/new")}. No need for a physical store – if
        you have something to sell, like a cozy bed, simply{" "}
        {getLink("list it", "listings/new")}. When you're on the hunt for
        something special, and it's not there yet, just{" "}
        {getLink("create a request", "")}. Someone might just have it.
      </Paragraph>

      <Text fontSize="xl" fontWeight="600" color={accentColor}>
        Our Vision
      </Text>
      <Paragraph>
        We dream of a world with less hassle and more internet. Picture a social
        media platform just for us, like Twitter or Facebook. Imagine an app for
        sharing photos specific to our campus – a place where photographers can
        truly shine. The possibilities are endless.
      </Paragraph>
      <Text fontSize="xl" fontWeight="600" color={accentColor}>
        Our Mission
      </Text>
      <Paragraph>
        Our mission is to make life easier, starting with Kisii University
        students and extending beyond. We're on a tech-driven journey, and if
        you share our vision, let's join forces by clicking the button below.
      </Paragraph>
      <Footer name="Baby Software">
        <StartChatBtn phoneNumber="254796720289" />
      </Footer>
    </PageContainer>
  );
};

export default AboutAppPage;
