import React from "react";

import ShopTypeSelector, { ShopTypeSelectorProps } from "./Selector";
import GridPageContainer from "../../grid/PageContainer";
import TypeList from "./List";

interface Props extends ShopTypeSelectorProps {
  children: React.ReactNode;
  gridHeadingLabel?: string;
  headingPrefix?: string;
}

const CategoriesGridPageContainer = ({
  children,
  onSelectType,
  selectedType,
  ...otherProps
}: Props) => {
  const Aside = (
    <TypeList onSelectType={onSelectType} selectedType={selectedType} />
  );

  const Selector = (
    <ShopTypeSelector onSelectType={onSelectType} selectedType={selectedType} />
  );

  return (
    <GridPageContainer
      {...otherProps}
      Aside={Aside}
      Selector={Selector}
      selectedItem={selectedType}
    >
      {children}
    </GridPageContainer>
  );
};

export default CategoriesGridPageContainer;
