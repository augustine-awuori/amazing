import { Box, HStack } from "@chakra-ui/react";

import { Category } from "../hooks/useCategories";
import AsideCategoryList from "./AsideCategoryList";
import CategorySelector from "./CategorySelector";
import ColorSwitchMode from "./ColorSwitchMode";
import GridHeading from "./GridHeading";
import PageContainer from "./PageContainer";

interface Props {
  children: JSX.Element;
  headingPrefix?: string;
  onSelectCategory: (category: Category) => void;
  selectedCategory: Category | null;
}

const GridPageContainer = ({
  children,
  headingPrefix,
  onSelectCategory,
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
    >
      <Box marginY={1} paddingLeft={2}>
        <Box display={{ md: "none", lg: "block" }}>
          <GridHeading
            selectedCategory={selectedCategory}
            headingPrefix={headingPrefix}
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
