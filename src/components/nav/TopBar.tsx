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
import useAppColorMode from "../../hooks/useAppColorMode";

const AppTab = ({ children, ...rest }: TabProps) => (
  <Tab letterSpacing={1.2} {...rest}>
    {children}
  </Tab>
);

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
        >
          <AppTab>Products</AppTab>
          <AppTab>Listings</AppTab>
          <AppTab>Requests</AppTab>
        </TabList>

        <TabPanels>
          <TabPanel>
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
