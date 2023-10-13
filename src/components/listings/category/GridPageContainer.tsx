import { ReactNode } from "react";

import { ScrollToTopBtn } from "../../../components";
import CategoryList from "./List";
import CategorySelector, { CategorySelectorProps } from "./Selector";
import GridPageContainer from "../../grid/PageContainer";

interface Props extends CategorySelectorProps {
  children: ReactNode;
  gridHeadingLabel?: string;
  headingPrefix?: string;
}

const CategoriesGridPageContainer = ({
  children,
  onSelectCategory,
  selectedCategory,
  ...otherProps
}: Props) => {
  const Aside = (
    <CategoryList
      onSelectCategory={onSelectCategory}
      selectedCategory={selectedCategory}
    />
  );

  const Selector = (
    <CategorySelector
      onSelectCategory={onSelectCategory}
      selectedCategory={selectedCategory}
    />
  );

  return (
    <>
      <ScrollToTopBtn />
      <GridPageContainer
        Aside={Aside}
        Selector={Selector}
        selectedItem={selectedCategory}
        {...otherProps}
      >
        {children}
      </GridPageContainer>
    </>
  );
};

export default CategoriesGridPageContainer;
