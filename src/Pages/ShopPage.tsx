import { useEffect, useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { FaLocationArrow } from "react-icons/fa";

import { Footer, Info, Grid, StartChatBtn, Text } from "../components";
import { paginate } from "../utils/paginate";
import { useNoGrid, useProducts, useReload, useShop, useShops } from "../hooks";
import { Modal, Pagination, ScrollToTopBtn } from "../components/common";
import { NewProductForm, ProductUpdateForm } from "../components/forms";
import { Product } from "../components/shops/product/Card";
import { Settings, ShopPageHeader as Header } from "../components/shops";
import { Shop } from "../hooks/useShop";
import Skeletons from "../components/shops/product/Skeleton";
import empty from "../utils/empty";
import ProductDetails from "../components/shops/product/Details";
import service from "../services/shops";
import DisplayCard from "../components/shops/product/DisplayCard";

const PAGE_SIZE = 6;

const ShopPage = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [showProductUpdateForm, setShowProductEditForm] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { setShop, shop: shopInfo } = useShop();
  const [product, setProduct] = useState<Product>();
  const { info: shop, request } = useReload<Shop>(
    checkShopExistence(shopInfo),
    empty.shop,
    service.getShop
  );
  const shopId = useParams().shopId;
  const { isLoading, products, productsCount } = useProducts(shopId);
  const helper = useShops();
  useNoGrid();

  useEffect(() => {
    request();
    setShop(shop);
    helper.incShopViews(shop._id);

    return () => setShop(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.length, shopId]);

  const phoneNumber = shop?.author?.otherAccounts?.whatsapp;

  function checkShopExistence(shop: Shop | null) {
    return shop?._id ? shop : undefined;
  }

  const paginated = paginate<Product>(products, currentPage, PAGE_SIZE);

  const switchShowProductForm = () => setShowProductForm(!showProductForm);

  const switchShowProductUpdateForm = () =>
    setShowProductEditForm(!showProductUpdateForm);

  const switchShowProductDetails = () =>
    setShowProductDetails(!showProductDetails);

  const switchShowSettings = () => setShowSettings(!showSettings);

  const handleEdit = (product: Product) => {
    setProduct(product);
    setShowProductEditForm(true);
  };

  const handleProductClick = (product: Product) => {
    setProduct(product);
    switchShowProductDetails();
  };

  const FooterInfo = (
    <HStack>
      <FaLocationArrow />
      <Text color="whiteAlpha.500">{shop.location || "Main Campus Area"}</Text>
    </HStack>
  );

  if (!paginated.length && !isLoading) return <Info />;

  return (
    <>
      {shop?._id && (
        <Modal
          isOpen={showProductForm}
          onModalClose={switchShowProductForm}
          content={
            <NewProductForm onDone={switchShowProductForm} shopId={shop._id} />
          }
        />
      )}
      <Modal
        isOpen={showProductUpdateForm}
        content={
          <ProductUpdateForm
            product={product}
            onDone={switchShowProductUpdateForm}
          />
        }
        onModalClose={switchShowProductUpdateForm}
      />
      {product && (
        <Modal
          isOpen={showProductDetails}
          content={
            <ProductDetails info={product} onDone={switchShowProductDetails} />
          }
          onModalClose={switchShowProductDetails}
        />
      )}
      <Modal
        title="Shop Settings"
        isOpen={showSettings}
        content={<Settings />}
        onModalClose={switchShowSettings}
      />
      <Box pt={20} px={{ md: 5, lg: 7 }} pb={4}>
        <ScrollToTopBtn />
        <Header
          onAddProduct={switchShowProductForm}
          onShowSettings={switchShowSettings}
          productsCount={productsCount}
          shopName={shop?.name}
        />
        <Grid>
          <Skeletons isLoading={isLoading} />
          {paginated.map((product, index) => (
            <DisplayCard
              key={index}
              product={product}
              onClick={() => handleProductClick(product)}
              onEdit={() => handleEdit(product)}
            />
          ))}
        </Grid>
        <Pagination
          itemsCount={productsCount}
          onPageChange={setCurrentPage}
          currentPage={currentPage}
          pageSize={PAGE_SIZE}
        />
        {shop && (
          <Footer
            Info={FooterInfo}
            name={`${shop?.name} Shop`}
            owner={`Shop Owner: ${shop?.author.name}`}
            verified={shop?.author?.isVerified}
          >
            {phoneNumber && <StartChatBtn phoneNumber={phoneNumber} />}
          </Footer>
        )}
      </Box>
    </>
  );
};

export default ShopPage;
