import {
  Box,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { BiCalendarEvent, BiShoppingBag } from "react-icons/bi";

import { fontFamily } from "../../data/typography";
import { EventsPage, ShopsPage } from "../../Pages";
import useAppColorMode from "../../hooks/useAppColorMode";

const TabButton = ({ icon }: { icon: JSX.Element }) => (
  <IconButton
    color="orange.400"
    size="sm"
    bg="inherit"
    aria-label="icon"
    icon={icon}
  />
);

const pages = [<ShopsPage />, <EventsPage />];
const tabs = [
  {
    label: "Mart",
    icon: <TabButton icon={<BiShoppingBag />} />,
  },
  {
    label: "Events",
    icon: <TabButton icon={<BiCalendarEvent />} />,
  },
];

const TopBar = () => {
  const { accentColor, color } = useAppColorMode();

  return (
    <Box display={{ sm: "block", md: "none" }} mt={14}>
      <Tabs isFitted variant="enclosed">
        <TabList
          fontFamily={fontFamily}
          backgroundColor={color}
          pos="fixed"
          zIndex={2}
          w="100%"
          p={2}
          pb={0}
        >
          {tabs.map(({ icon, label }, index) => (
            <Tab key={index} letterSpacing={1} _active={{ color: accentColor }}>
              {icon} {label}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          {pages.map((page, index) => (
            <TabPanel key={index} px={0} pt={0}>
              {page}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default TopBar;
