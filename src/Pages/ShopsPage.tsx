import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Item } from "../components/common/Selector";
import {
  SearchInput,
  ShopsGrid,
  ShopsTypesGridPageContainer,
  NewItemButton as NewShopButton,
} from "../components";
import { Type } from "../hooks/useTypes";
import { useProducts, useShops } from "../hooks";
import ShopsProductsGrid from "../components/shops/product/Grid";
import ShowSelector from "../components/shops/ShowSelector";
import useShop, { Shop } from "../hooks/useShop";

const ShopsPage = () => {
  const navigate = useNavigate();
  const { setShop } = useShop();
  const { error, isLoading, shops } = useShops();
  const [selectedType, setSelectedType] = useState<Type | null>(null);
  const [filter, setFilter] = useState<Item | null>(null);
  const { products, isLoading: productsLoading } = useProducts(undefined);
  const [productsCurrentPage, setProductsCurrentPage] = useState(1);
  const [shopsCurrentPage, setShopsCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [productsPageSize] = useState(8);
  const [query, setQuery] = useState("");

  const navigateToDetails = (shop: Shop) => {
    setShop(shop);
    navigate(shop._id);
  };

  const showingShops = filter?.label.toLowerCase() === "shops";

  const getHeadingLabel = () => {
    const shopsLabel = "Shops";

    return showingShops ? shopsLabel : `${shopsLabel}' Products`;
  };

  const resetCurrentPage = () =>
    showingShops ? setShopsCurrentPage(1) : setProductsCurrentPage(1);

  const handleSelectType = (type: Type) => {
    resetCurrentPage();
    setQuery("");
    setSelectedType(type);
  };

  const handleTextChange = (text: string) => {
    resetCurrentPage();
    setQuery(text);
  };

  const Filter = (
    <ShowSelector
      name={filter?.label || "Products"}
      onSelectItem={setFilter}
      selectedItem={filter}
    />
  );

  const HeadingELement = (
    <SearchInput
      placeholder={` Search ${getHeadingLabel()}`}
      onTextChange={handleTextChange}
      value={query}
    />
  );

  return (
    <ShopsTypesGridPageContainer
      gridHeadingLabel={getHeadingLabel()}
      HeadingElement={HeadingELement}
      Filter={Filter}
      onSelectType={handleSelectType}
      selectedType={selectedType}
    >
      <NewShopButton />
      {showingShops ? (
        <ShopsGrid
          currentPage={shopsCurrentPage}
          error={error}
          isLoading={isLoading}
          pageSize={pageSize}
          onPageChange={setShopsCurrentPage}
          onShopClick={navigateToDetails}
          selectedType={selectedType}
          shops={shops}
          query={query}
        />
      ) : (
        <ShopsProductsGrid
          currentPage={productsCurrentPage}
          error=""
          isLoading={productsLoading}
          onClick={navigate}
          pageSize={productsPageSize}
          products={products}
          selectedType={selectedType}
          onPageChange={setProductsCurrentPage}
          query={query}
        />
      )}
    </ShopsTypesGridPageContainer>
  );
};

export default ShopsPage;
