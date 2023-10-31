import { ReactNode } from "react";
import { Box, HStack } from "@chakra-ui/react";

import { Item } from "../common/Selector";
import CategorySelector from "../listings/category/Selector";
import ColorSwitchMode from "../common/ColorSwitchMode";
import GridHeading from "./Heading";
import PageContainer from "../PageContainer";

interface Props {
  Aside?: JSX.Element;
  children: ReactNode;
  Filter?: JSX.Element;
  gridHeadingLabel?: string;
  headingPrefix?: string;
  onSelectCategory?: (item: Item) => void;
  selectedItem: Item | null;
  Selector?: JSX.Element;
}

const GridPageContainer = ({
  children,
  Filter,
  gridHeadingLabel,
  headingPrefix,
  onSelectCategory = () => {},
  selectedItem,
  Selector,
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
      <Box marginY={1}>
        <Box>
          <GridHeading
            selectedItem={selectedItem}
            headingPrefix={headingPrefix}
            label={gridHeadingLabel}
          />
        </Box>
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
