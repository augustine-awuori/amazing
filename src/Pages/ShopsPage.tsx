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

  const navigateToDetails = (shop: Shop) => {
    setShop(shop);
    navigate(shop._id);
  };

  const Filter = (
    <ShowSelector
      name={filter?.label || "Products"}
      onSelectItem={setFilter}
      selectedItem={filter}
    />
  );

  const getHeadingLabel = () => {
    const prefix = "Shops";

    if (filter?.label.toLowerCase() === "shops") return prefix;

    return `${prefix} Products`;
  };

  const showingShops = filter?.label.toLowerCase() === "shops";

  return (
    <ShopsTypesGridPageContainer
      onSelectType={setSelectedType}
      selectedType={selectedType}
      gridHeadingLabel={getHeadingLabel()}
      Filter={Filter}
    >
      {showingShops ? (
        <ShopsGrid
          error={error}
          isLoading={isLoading}
          onShopClick={navigateToDetails}
          selectedType={selectedType}
          shops={shops}
        />
      ) : (
        <ShopsProductsGrid
          error=""
          isLoading={productsLoading}
          onClick={() => {}}
          products={products}
          selectedType={selectedType}
        />
      )}
    </ShopsTypesGridPageContainer>
  );
};

export default ShopsPage;
