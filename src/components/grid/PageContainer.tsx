import { ReactNode } from "react";
import { Box, Flex, HStack } from "@chakra-ui/react";

import { Item } from "../common/Selector";
import CategorySelector from "../listings/category/Selector";
import ColorSwitchMode from "../common/ColorSwitchMode";
import GridHeading from "./Heading";
import PageContainer from "../PageContainer";

export interface PageContainerProps {
  children: ReactNode;
  Filter?: JSX.Element;
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
  Filter,
  gridHeadingLabel,
  headingPrefix,
  onSelectCategory = () => {},
  selectedItem,
  Selector,
  HeadingElement: RightHeadingElement,
  ...otherProps
}: Props) => {
  const TempSelector = () => (
    <Box display={{ lg: "none" }}>
      {Selector || (
        <CategorySelector
          selectedCategory={selectedItem}
          onSelectCategory={onSelectCategory}
        />
      )}
    </Box>
  );

  return (
    <PageContainer {...otherProps}>
      <Box>
        <Flex alignItems="start" justifyContent="space-between" w="100%">
          {RightHeadingElement || (
            <GridHeading
              selectedItem={selectedItem}
              headingPrefix={headingPrefix}
              label={gridHeadingLabel}
            />
          )}
        </Flex>
        <HStack justifyContent="space-between" marginTop={3}>
          <HStack>
            {Filter && <Box>{Filter}</Box>}
            <TempSelector />
          </HStack>
          <ColorSwitchMode />
        </HStack>
      </Box>
      {children}
    </PageContainer>
  );
};

export default GridPageContainer;
