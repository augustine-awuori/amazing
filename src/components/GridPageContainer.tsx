import { Box, HStack } from "@chakra-ui/react";

import { Category } from "../hooks/useCategories";
import AsideCategoryList from "./AsideCategoryList";
import CategorySelector from "./CategorySelector";
import ColorSwitchMode from "./ColorSwitchMode";
import GridHeading from "./GridHeading";
import PageContainer from "./PageContainer";

interface Props {
  children: JSX.Element;
  gridHeadingLabel?: string;
  headingPrefix?: string;
  onSelectCategory: (category: Category) => void;
  pl?: string | number;
  pr?: string | number;
  selectedCategory: Category | null;
}

const GridPageContainer = ({
  children,
  gridHeadingLabel,
  headingPrefix,
  onSelectCategory,
  pl = 5,
  pr = 5,
  selectedCategory,
}: Props) => {
  return (
    <PageContainer
      Aside={
        <AsideCategoryList
          onSelectCategory={onSelectCategory}
          selectedCategory={selectedCategory}
        />
      }
      pl={pl}
      pr={pr}
    >
      <Box marginY={1}>
        <Box>
          <GridHeading
            selectedCategory={selectedCategory}
            headingPrefix={headingPrefix}
            label={gridHeadingLabel}
          />
        </Box>
        <HStack justifyContent="space-between" marginTop={3}>
          <Box display={{ lg: "none" }}>
            <CategorySelector
              onSelectCategory={onSelectCategory}
              selectedCategory={selectedCategory}
            />
          </Box>
          <ColorSwitchMode />
        </HStack>
      </Box>
      {children}
    </PageContainer>
  );
};

export default GridPageContainer;
