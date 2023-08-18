import { GridItem } from "@chakra-ui/react";

interface Props {
  Aside?: JSX.Element;
  children: any;
}

const PageContainer = ({ Aside, children }: Props) => {
  return (
    <>
      {Aside && (
        <GridItem area="aside" paddingX={5} marginTop={2}>
          {Aside}
        </GridItem>
      )}
      <GridItem area="main" paddingX={5}>
        {children}
      </GridItem>
    </>
  );
};

export default PageContainer;
