import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import { ListingsPage, RequestsPage, ShopsPage } from "../../Pages";
import useAppColorMode from "../../hooks/useAppColorMode";

const pages = [<ShopsPage />, <ListingsPage />, <RequestsPage />];
const tabs = ["Products", "Listings", "Requests"];

const TopBar = () => {
  const { color } = useAppColorMode();

  return (
    <Box display={{ sm: "block", md: "none" }} mt={14}>
      <Tabs isFitted variant="enclosed">
        <TabList
          fontFamily="andika"
          backgroundColor={color}
          pos="fixed"
          zIndex={2}
          w="100%"
          p={2}
          pb={0}
        >
          {tabs.map((tab) => (
            <Tab key={tab} letterSpacing={1.2}>
              {tab}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          {pages.map((page, index) => (
            <TabPanel key={index}>{page}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default TopBar;
