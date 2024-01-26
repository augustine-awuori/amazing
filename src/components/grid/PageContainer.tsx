import { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";

import { Item } from "../common/Selector";
import { useAppColorMode } from "../../hooks";
import GridHeading from "./Heading";
import PageContainer from "../PageContainer";

export interface PageContainerProps {
  children: ReactNode;
  gridHeadingLabel?: string;
  headingPrefix?: string;
  HeadingElement?: JSX.Element;
}

interface Props extends PageContainerProps {
  Aside?: JSX.Element;
  onSelectCategory?: (item: Item) => void;
  selectedItem: Item | null;
  Selector?: JSX.Element;
  showSearchInput?: boolean;
}

const GridPageContainer = ({
  children,
  gridHeadingLabel,
  headingPrefix,
  selectedItem,
  HeadingElement: RightHeadingElement,
  ...otherProps
}: Props) => {
  const { color } = useAppColorMode();

  return (
    <PageContainer {...otherProps} pos="relative">
      <Box
        pos="sticky"
        top={9}
        left={0}
        zIndex={1}
        bgColor={color}
        pt={4}
        right={0}
      >
        <Flex alignItems="start" justifyContent="space-between" w="100%">
          {RightHeadingElement || (
            <GridHeading
              selectedItem={selectedItem}
              headingPrefix={headingPrefix}
              label={gridHeadingLabel}
            />
          )}
        </Flex>
      </Box>
      <Box marginTop="10px">{children}</Box>
    </PageContainer>
  );
};

export default GridPageContainer;
