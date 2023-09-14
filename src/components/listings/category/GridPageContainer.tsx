import CategoryList from "./List";
import CategorySelector, { CategorySelectorProps } from "./Selector";
import GridPageContainer from "../../grid/PageContainer";

interface Props extends CategorySelectorProps {
  children: any;
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
    <GridPageContainer
      Aside={Aside}
      Selector={Selector}
      selectedItem={selectedCategory}
      {...otherProps}
    >
      {children}
    </GridPageContainer>
  );
};

export default CategoriesGridPageContainer;
