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
import { AiFillEdit, AiOutlineLogin } from "react-icons/ai";

import { Item } from "../components/common/Selector";
import {
  SearchInput,
  ShopsGrid,
  CategorySelector,
  SideBar,
  Text,
} from "../components";
import { Category } from "../hooks/useCategories";
import { BadgesList, Modal } from "../components/common";
import { empty, funcs } from "../utils";
import { ListingsPage, RequestsPage } from "./";
import { ShopSelectors } from "../components/listings";
import { SideBarItem } from "../components/SideBar";
import { useCategories, useProducts, useShops } from "../hooks";
import auth from "../services/auth";
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
  const [selectedType, setSelectedType] = useState<Type>(empty.type);
  const [filter, setFilter] = useState<Item | null>(null);
  const { products, isLoading: productsLoading } = useProducts(undefined);
  const [productsCurrentPage, setProductsCurrentPage] = useState(1);
  const [shopsCurrentPage, setShopsCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const pageSize = useBreakpointValue({ sm: 6, md: 9 }) || 6;
  const [selectedSideItem, setSelectedSideItem] = useState("Products");
  const [Content, setContent] = useState<JSX.Element>();
  const { categories } = useCategories();
  const { types } = useTypes();
  const [rightSideBarTitle, setRightSideBarTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [selectedShopId, setSelectedShopId] = useState("");
  const [selectShop, setSelectShop] = useState(false);
  const [authRequested, setAuthRequest] = useState(false);

  useEffect(() => {
    setContent(renderContent());

    setRightSideBarTitle(renderRightSideBarTitle() || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedSideItem,
    filter,
    shops.length,
    products.length,
    selectedCategory?._id,
    types.length,
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
        placeholder={`Search ${getHeadingLabel()} (${selectedType?.label})`}
        onTextChange={handleTextChange}
        value={query}
        mr={3}
      />
      <ShowSelector
        name={filter?.label || "Products"}
        onSelectItem={setFilter}
        selectedItem={filter}
      />
      <IconButton
        aria-label="button"
        icon={<BiDotsHorizontalRounded />}
        ml={3}
        onClick={onOpen}
        borderRadius={10}
      />
    </Flex>
  );

  const HeadingELement = (
    <Box mt={{ sm: 5, md: 0 }}>
      <Flex display={{ md: "flex", base: "block" }} w="100%" align="center">
        {CommonHeader}
      </Flex>
      <BadgesList
        list={types}
        onItemSelect={setSelectedType}
        selectedItem={selectedType}
      />
    </Box>
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

  const handleSideItemSelect = (label: string) => {
    onClose?.();
    setQuery("");
    setSelectedSideItem(label);
  };

  const handleShopSelection = () =>
    selectedShopId
      ? navigate(selectedShopId)
      : toast.info("Plese select a shop or create a new one");

  const handleProductCreation = () =>
    auth.getCurrentUser() ? setSelectShop(true) : setAuthRequest(true);

  const handleItemCreation = () => {
    if (selectedSideItem === "Products") return handleProductCreation();
    if (selectedSideItem === "Requests") return navigate("/requests/new");
    if (selectedSideItem === "Listings") return navigate("/listings/new");
    toast.info("Add products to cart to order");
  };

  const AppSideBar = (
    <SideBar
      Icon={<BiShoppingBag />}
      buttonLabel={`New ${funcs.removeLastChar(selectedSideItem)}`}
      items={items}
      onButtonClick={handleItemCreation}
      onItemSelect={handleSideItemSelect}
      pageTitle="mart"
      selectedItemLabel={selectedSideItem}
    />
  );

  const OtherComponents = (
    <>
      <Modal
        content={
          <Text>
            Others need to know who the product belongs to. This is 'cause they
            need to to contact you.
          </Text>
        }
        isOpen={authRequested}
        onModalClose={() => setAuthRequest(false)}
        title="You're not logged in"
        primaryBtnLabel="Sign In"
        PrimaryLeftIcon={<AiOutlineLogin />}
        secondaryBtnLabel="Sign Up"
        SecondaryLeftIcon={<AiFillEdit />}
        onPrimaryClick={() => navigate("/login")}
        onSecondaryClick={() => navigate("/register")}
      />
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
    </>
  );

  return (
    <ThreeGridPage
      onClose={onClose}
      // RightSideBarContent={RightSideBarContent}
      SideBarContent={AppSideBar}
      MainContent={Content}
      isBottomSheetOpen={isOpen}
      onBottomSheetSwipeUp={onOpen}
      OtherContents={OtherComponents}
    />
  );
};

export default ShopsPage;
