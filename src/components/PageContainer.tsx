import { ReactNode } from "react";
import { GridItem, GridItemProps } from "@chakra-ui/react";

interface Props extends GridItemProps {
  Aside?: JSX.Element;
  children: ReactNode;
  paddingTop?: number;
}

const PageContainer = ({
  Aside,
  children,
  paddingTop = 16,
  px = 5,
  ...rest
}: Props) => (
  <>
    {Aside && (
      <GridItem
        area="aside"
        display={{ base: "none", lg: "block" }}
        marginTop={2}
        paddingX={5}
        pt={paddingTop}
        position="fixed"
        top={0}
        left={0}
      >
        {Aside}
      </GridItem>
    )}
    <GridItem
      area="main"
      px={px}
      pt={{ base: 35, sm: 29, md: paddingTop }}
      {...rest}
    >
      {children}
    </GridItem>
  </>
);

export default PageContainer;
