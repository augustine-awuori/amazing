import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ScrollToTopBtn,
  ShopsGrid,
  ShopsTypesGridPageContainer,
} from "../components";
import useShop, { Shop, Type } from "../hooks/useShop";
import useShops from "../hooks/useShops";

const ShopsPage = () => {
  const navigate = useNavigate();
  const { setShop } = useShop();
  const { error, isLoading, shops } = useShops();
  const [selectedType, setSelectedType] = useState<Type | null>(null);

  const navigateToDetails = (shop: Shop) => {
    setShop(shop);
    navigate(shop._id);
  };

  return (
    <>
      <ScrollToTopBtn />
      <ShopsTypesGridPageContainer
        onSelectType={setSelectedType}
        selectedType={selectedType}
        gridHeadingLabel="Shops"
      >
        <ShopsGrid
          error={error}
          isLoading={isLoading}
          onShopClick={navigateToDetails}
          selectedType={selectedType}
          shops={shops}
        />
      </ShopsTypesGridPageContainer>
    </>
  );
};

export default ShopsPage;
