import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import {
  BiChair,
  BiChat,
  BiHomeAlt,
  BiReceipt,
  BiShoppingBag,
} from "react-icons/bi";

import { Item } from "../components/common/Selector";
import {
  SearchInput,
  ShopsGrid,
  CategorySelector,
  SideBar,
} from "../components";
import { SideBarItem } from "../components/SideBar";
import { Type } from "../hooks/useTypes";
import { useProducts, useShops } from "../hooks";
import ShopsProductsGrid from "../components/shops/product/Grid";
import ShowSelector from "../components/shops/ShowSelector";
import ThreeGridPage from "./ThreeGridPage";
import useShop, { Shop } from "../hooks/useShop";

const items: SideBarItem[] = [
  { icon: <BiHomeAlt />, label: "Home" },
  { icon: <BiChair />, label: "Listings" },
  { icon: <BiChat />, label: "Requests" },
  { icon: <BiReceipt />, label: "Orders" },
];

const ShopsPage = () => {
  const navigate = useNavigate();
  const { setShop } = useShop();
  const { error, isLoading, shops } = useShops();
  const [selectedType, setSelectedType] = useState<Type | null>(null);
  const [filter, setFilter] = useState<Item | null>(null);
  const { products, isLoading: productsLoading } = useProducts(undefined);
  const [productsCurrentPage, setProductsCurrentPage] = useState(1);
  const [shopsCurrentPage, setShopsCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const pageSize = useBreakpointValue({ sm: 6, md: 12 }) || 6;

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

  const HeadingELement = (
    <Flex
      display={{ md: "flex", base: "block" }}
      mt={{ sm: 5, md: 0 }}
      w="100%"
      align="center"
    >
      <SearchInput
        placeholder={`Search ${getHeadingLabel()}`}
        onTextChange={handleTextChange}
        value={query}
        mr={3}
      />
      <Flex>
        <ShowSelector
          name={filter?.label || "Products"}
          onSelectItem={setFilter}
          selectedItem={filter}
        />
        <Box display={{ lg: "none" }} ml={3}>
          <CategorySelector
            selectedCategory={selectedType}
            onSelectCategory={setSelectedType}
          />
        </Box>
      </Flex>
    </Flex>
  );

  const Content = showingShops ? (
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
      pageSize={pageSize}
      products={products}
      selectedType={selectedType}
      onPageChange={setProductsCurrentPage}
      query={query}
    />
  );

  const AppSideBar = (
    <SideBar
      Icon={<BiShoppingBag />}
      buttonLabel="Create Product"
      items={items}
      onButtonClick={() => {}}
      onItemSelect={() => {}}
      pageTitle="mart"
      selectedItemLabel=""
    />
  );

  const MainContent = (
    <>
      {HeadingELement}
      {Content}
    </>
  );

  return (
    <ThreeGridPage
      RightSideBarContent={<></>}
      SideBarContent={AppSideBar}
      MainContent={MainContent}
      isBottomSheetOpen={false}
      onBottomSheetSwipeUp={() => {}}
    />
  );
};

export default ShopsPage;
