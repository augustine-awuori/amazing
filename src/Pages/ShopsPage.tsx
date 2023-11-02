import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Item } from "../components/common/Selector";
import { ShopsGrid, ShopsTypesGridPageContainer } from "../components";
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

  const navigateToDetails = (shop: Shop) => {
    setShop(shop);
    navigate(shop._id);
  };

  const getHeadingLabel = () => {
    const prefix = "Shops";

    if (filter?.label.toLowerCase() === "shops") return prefix;

    return `${prefix} Products`;
  };

  const showingShops = filter?.label.toLowerCase() === "shops";

  const handleSelectType = (type: Type) => {
    showingShops ? setShopsCurrentPage(1) : setProductsCurrentPage(1);
    setSelectedType(type);
  };

  const Filter = (
    <ShowSelector
      name={filter?.label || "Products"}
      onSelectItem={setFilter}
      selectedItem={filter}
    />
  );

  return (
    <ShopsTypesGridPageContainer
      onSelectType={handleSelectType}
      selectedType={selectedType}
      gridHeadingLabel={getHeadingLabel()}
      Filter={Filter}
    >
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
        />
      ) : (
        <ShopsProductsGrid
          currentPage={productsCurrentPage}
          error=""
          isLoading={productsLoading}
          onClick={navigate}
          pageSize={pageSize}
          products={products}
          selectedType={selectedType}
          onPageChange={setProductsCurrentPage}
        />
      )}
    </ShopsTypesGridPageContainer>
  );
};

export default ShopsPage;
