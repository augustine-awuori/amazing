import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Flex,
  IconButton,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  BiChair,
  BiChat,
  BiDotsHorizontalRounded,
  BiHomeAlt,
  BiPlusCircle,
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
import { Category } from "../hooks/useCategories";
import { GridAsideList, Modal } from "../components/common";
import { ListingsPage, RequestsPage } from "./";
import { ShopSelectors } from "../components/listings";
import { SideBarItem } from "../components/SideBar";
import { useCategories, useProducts, useShops } from "../hooks";
import MyOrdersPage from "./MyOrdersPage";
import ShopsProductsGrid from "../components/shops/product/Grid";
import ShowSelector from "../components/shops/ShowSelector";
import ThreeGridPage from "./ThreeGridPage";
import useShop, { Shop } from "../hooks/useShop";
import useTypes, { Type } from "../hooks/useTypes";

const items: SideBarItem[] = [
  { icon: <BiHomeAlt />, label: "Products" },
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
  const pageSize = useBreakpointValue({ sm: 6, md: 9, lg: 6 }) || 6;
  const [selectedSideItem, setSelectedSideItem] = useState("Products");
  const [Content, setContent] = useState<JSX.Element>();
  const { categories } = useCategories();
  const { types } = useTypes();
  const [rightSideBarItems, setRightBarContent] = useState<null | Item[]>();
  const [rightSideBarTitle, setRightSideBarTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [selectedShopId, setSelectedShopId] = useState("");
  const [selectShop, setSelectShop] = useState(false);

  useEffect(() => {
    setContent(renderContent());
    setRightBarContent(renderRightSideBarContent());
    setRightSideBarTitle(renderRightSideBarTitle() || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedSideItem,
    filter,
    shops.length,
    products.length,
    selectedCategory,
    selectedType,
    productsCurrentPage,
    shopsCurrentPage,
    query,
  ]);

  const navigateToDetails = (shop: Shop) => {
    setShop(shop);
    navigate(shop._id);
  };

  const showingShops = filter?.label.toLowerCase() === "shops";

  const getHeadingLabel = (): string => {
    const shopsLabel = "Shops";

    if (selectedSideItem.toLowerCase() === "products")
      return showingShops ? shopsLabel : `${shopsLabel}' Products`;

    return selectedSideItem;
  };

  const resetCurrentPage = () =>
    showingShops ? setShopsCurrentPage(1) : setProductsCurrentPage(1);

  const handleTextChange = (text: string) => {
    resetCurrentPage();
    setQuery(text);
  };

  const CommonHeader = (
    <Flex w="100%" align="center">
      <SearchInput
        placeholder={`Search ${getHeadingLabel()}`}
        onTextChange={handleTextChange}
        value={query}
        mr={3}
      />
      <IconButton
        aria-label="button"
        icon={<BiDotsHorizontalRounded />}
        mr={3}
        onClick={onOpen}
        borderRadius={10}
      />
    </Flex>
  );

  const HeadingELement = (
    <Flex
      display={{ md: "flex", base: "block" }}
      mt={{ sm: 5, md: 0 }}
      w="100%"
      align="center"
    >
      {CommonHeader}
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

  const MainContent = (
    <>
      {HeadingELement}
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
          pageSize={pageSize}
          products={products}
          selectedType={selectedType}
          onPageChange={setProductsCurrentPage}
          query={query}
        />
      )}
    </>
  );

  function renderRightSideBarTitle() {
    switch (selectedSideItem) {
      case "Products":
        return "Type";

      case "Listings":
        return "Categories";

      case "Requests":
        return "Categories";

      default:
        return null;
    }
  }

  function renderRightSideBarContent() {
    switch (selectedSideItem) {
      case "Products":
        return types;

      case "Listings":
        return categories;

      case "Requests":
        return categories;

      default:
        return null;
    }
  }

  function renderContent(): JSX.Element {
    switch (selectedSideItem) {
      case "Products":
        return MainContent;

      case "Listings":
        return (
          <>
            {CommonHeader}
            <ListingsPage
              selectedCategory={selectedCategory}
              onRequestsPageNav={() => setSelectedSideItem("Requests")}
              searchQuery={query}
            />
          </>
        );

      case "Requests":
        return (
          <>
            {CommonHeader}
            <RequestsPage
              selectedCategory={selectedCategory}
              onListingsPageNav={() => setSelectedSideItem("Listings")}
              searchQuery={query}
            />
          </>
        );

      default:
        return (
          <>
            {CommonHeader}
            <MyOrdersPage />
          </>
        );
    }
  }

  const title = rightSideBarTitle.toLowerCase();

  const handleRightSideBarItemSelect = (item: Item) => {
    resetCurrentPage();
    setQuery("");

    title === "type" ? setSelectedType(item) : setSelectedCategory(item);
  };

  const handleSideItemSelect = (label: string) => {
    onClose?.();
    setQuery("");
    setSelectedSideItem(label);
  };

  const handleShopSelection = () =>
    selectedShopId
      ? navigate(selectedShopId)
      : toast.info("Plese select a shop or create a new one");

  const AppSideBar = (
    <SideBar
      Icon={<BiShoppingBag />}
      buttonLabel="New Product"
      items={items}
      onButtonClick={() => setSelectShop(true)}
      onItemSelect={handleSideItemSelect}
      pageTitle="mart"
      selectedItemLabel={selectedSideItem}
    />
  );

  const RightSideBarContent = (
    <GridAsideList
      heading={rightSideBarTitle}
      isLoading={false}
      items={rightSideBarItems || []}
      onSelectItem={handleRightSideBarItemSelect}
      selectedItem={title === "type" ? selectedType : selectedCategory}
    />
  );

  const OtherComponents = (
    <Modal
      content={
        <ShopSelectors
          onShopSelect={setSelectedShopId}
          selectedShop={selectedShopId}
        />
      }
      isOpen={selectShop}
      onModalClose={() => setSelectShop(false)}
      title="To Which Shop?"
      primaryBtnLabel="Select"
      secondaryBtnLabel="Create New"
      SecondaryLeftIcon={<BiPlusCircle />}
      onPrimaryClick={handleShopSelection}
      onSecondaryClick={() => navigate("new")}
      subTitle="Select Shop"
    />
  );

  return (
    <ThreeGridPage
      onClose={onClose}
      RightSideBarContent={RightSideBarContent}
      SideBarContent={AppSideBar}
      MainContent={Content}
      isBottomSheetOpen={isOpen}
      onBottomSheetSwipeUp={onOpen}
      OtherContents={OtherComponents}
    />
  );
};

export default ShopsPage;
