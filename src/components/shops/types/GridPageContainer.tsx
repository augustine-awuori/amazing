import { ReactNode } from "react";

import { ScrollToTopBtn } from "../../../components";
import ShopTypeSelector, { ShopTypeSelectorProps } from "./Selector";
import GridPageContainer from "../../grid/PageContainer";
import TypeList from "./List";

interface Props extends ShopTypeSelectorProps {
  children: ReactNode;
  Filter?: JSX.Element;
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
    <>
      <ScrollToTopBtn />
      <GridPageContainer
        {...otherProps}
        Aside={Aside}
        Selector={Selector}
        selectedItem={selectedType}
      >
        {children}
      </GridPageContainer>
    </>
  );
};

export default CategoriesGridPageContainer;
