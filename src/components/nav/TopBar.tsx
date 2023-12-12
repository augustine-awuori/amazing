import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  TabProps,
  Tabs,
} from "@chakra-ui/react";

import { ListingsPage, RequestsPage, ShopsPage } from "../../Pages";

const AppTab = ({ children, ...rest }: TabProps) => (
  <Tab
    // _selected={{ color: "orange" }}
    letterSpacing={1.2}
    {...rest}
  >
    {children}
  </Tab>
);

const TopBar = () => {
  return (
    <Box display={{ sm: "block", md: "none" }} mt={16}>
      <Tabs isFitted variant="enclosed">
        <TabList fontFamily="andika">
          <AppTab>Products</AppTab>
          <AppTab>Listings</AppTab>
          <AppTab>Requests</AppTab>
        </TabList>

        <TabPanels pt={0}>
          <TabPanel p={0} pt={0}>
            <ShopsPage />
          </TabPanel>
          <TabPanel>
            <ListingsPage />
          </TabPanel>
          <TabPanel>
            <RequestsPage />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default TopBar;
