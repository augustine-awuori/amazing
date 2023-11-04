import { ScrollToTopBtn } from "../../../components";
import ShopTypeSelector, { ShopTypeSelectorProps } from "./Selector";
import GridPageContainer, {
  PageContainerProps,
} from "../../grid/PageContainer";
import TypeList from "./List";

interface Props extends ShopTypeSelectorProps, PageContainerProps {}

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
        showSearchInput
      >
        {children}
      </GridPageContainer>
    </>
  );
};

export default CategoriesGridPageContainer;
