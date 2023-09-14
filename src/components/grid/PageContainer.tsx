import { Box, HStack } from "@chakra-ui/react";

import { Item } from "../common/Selector";
import CategorySelector from "../listings/category/Selector";
import ColorSwitchMode from "../common/ColorSwitchMode";
import GridHeading from "./Heading";
import PageContainer from "../PageContainer";

interface Props {
  Aside?: JSX.Element;
  children: any;
  gridHeadingLabel?: string;
  headingPrefix?: string;
  onSelectCategory?: (item: Item) => void;
  selectedItem: Item | null;
  Selector?: JSX.Element;
}

const GridPageContainer = ({
  children,
  gridHeadingLabel,
  headingPrefix,
  onSelectCategory = () => {},
  selectedItem,
  Selector,
  ...otherProps
}: Props) => (
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
        <Box display={{ lg: "none" }}>
          {Selector || (
            <CategorySelector
              selectedCategory={selectedItem}
              onSelectCategory={onSelectCategory}
            />
          )}
        </Box>
        <ColorSwitchMode />
      </HStack>
    </Box>
    {children}
  </PageContainer>
);

export default GridPageContainer;
