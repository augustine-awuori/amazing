import React from "react";
import { GridItem } from "@chakra-ui/react";

interface Props {
  Aside?: JSX.Element;
  children: React.ReactNode;
  paddingTop?: number;
}

const PageContainer = ({ Aside, children, paddingTop = 20 }: Props) => (
  <>
    {Aside && (
      <GridItem
        area="aside"
        display={{ base: "none", lg: "block" }}
        marginTop={2}
        paddingX={5}
        pt={paddingTop}
      >
        {Aside}
      </GridItem>
    )}
    <GridItem area="main" px={5} pt={paddingTop}>
      {children}
    </GridItem>
  </>
);

export default PageContainer;
