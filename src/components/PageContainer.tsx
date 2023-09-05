import { GridItem } from "@chakra-ui/react";

interface Props {
  Aside?: JSX.Element;
  children: any;
  paddingTop?: number;
  pl?: string | number;
  pr?: string | number;
}

const PageContainer = ({
  Aside,
  children,
  pl = 5,
  pr = 5,
  paddingTop = 20,
}: Props) => (
  <>
    {Aside && (
      <GridItem area="aside" paddingX={5} marginTop={2} pt={paddingTop}>
        {Aside}
      </GridItem>
    )}
    <GridItem area="main" pl={pl} pr={pr} pt={paddingTop}>
      {children}
    </GridItem>
  </>
);

export default PageContainer;
