import { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";

import { Item } from "../common/Selector";
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
  return (
    <PageContainer {...otherProps}>
      <Box mb={2}>
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
      {children}
    </PageContainer>
  );
};

export default GridPageContainer;
