import { useBreakpointValue } from "@chakra-ui/react";

import TopBar from "../components/nav/TopBar";

const CheckScreenWidth = ({ Component }: { Component: JSX.Element }) => {
  const isSmallScreen = useBreakpointValue({ sm: true, md: false });

  if (isSmallScreen) return <TopBar />;

  return Component;
};

export default CheckScreenWidth;
