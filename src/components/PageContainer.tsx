import { GridItem } from "@chakra-ui/react";

interface Props {
  Aside?: JSX.Element;
  children: any;
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
    <GridItem area="main" p={5} pt={paddingTop}>
      {children}
    </GridItem>
  </>
);

export default PageContainer;
