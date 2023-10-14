import { useEffect, useState } from "react";
import { HStack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { FaLocationArrow } from "react-icons/fa";

import { Footer, Info, PageContainer, StartChatBtn, Text } from "../components";
import { paginate } from "../utils/paginate";
import {
  useBag,
  useCurrentUser,
  useProducts,
  useReload,
  useShop,
} from "../hooks";
import { Modal, Pagination, ScrollToTopBtn } from "../components/common";
import { NewProductForm, ProductUpdateForm } from "../components/forms";
import { Settings, ShopPageHeader as Header } from "../components/shops";
import { Shop } from "../hooks/useShop";
import CardSkeletons from "../components/card/Skeletons";
import empty from "../utils/empty";
import Grid from "../components/grid";
import ProductCard, { Product } from "../components/shops/product/Card";
import ProductDetails from "../components/shops/product/Details";
import service from "../services/shops";

const PAGE_SIZE = 6;

const ShopPage = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [showProductUpdateForm, setShowProductEditForm] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { bag, setBag } = useBag();
  const { setShop, shop: shopInfo } = useShop();
  const [product, setProduct] = useState<Product>();
  const navigate = useNavigate();
  const params = useParams();
  const { info: shop, request } = useReload<Shop>(
    shopInfo,
    empty.shop,
    service.getShop
  );
  const { isLoading, products, productsCount, setProducts } = useProducts(
    params.shopId
  );
  const authorId = shop?.author?._id;
  const isTheAuthor = useCurrentUser(authorId);

  useEffect(() => {
    request();
    setShop(shop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.length, shop?._id]);

  const phoneNumber = shop?.author?.otherAccounts?.whatsapp;

  const markBought = products.map((p) => {
    const ids = { ...bag.ids };

    if (ids[p._id]) {
      const found = bag.products.find((pro) => pro._id === p._id);
      if (found) return found;
    }

    return p;
  });

  const paginated = paginate<Product>(markBought, currentPage, PAGE_SIZE);

  const navigateToViewBag = () => navigate("my-bag");

  const markAddedProducts = (product: Product) => {
    const ids = { ...bag.ids };

    if (!ids[product._id]) {
      ids[product._id] = true;

      return setBag({ ids, products: [...bag.products, product] });
    }

    const updated = bag.products.map((p) =>
      p._id === product._id ? product : p
    );
    setBag({ ids, products: updated });
  };

  const unmarkRemovedProducts = (product: Product) => {
    const ids = { ...bag.ids };

    if (!product.quantity) {
      delete ids[product._id];

      return setBag({
        ids,
        products: bag.products.filter((p) => p._id !== product._id),
      });
    }

    const updated = [...bag.products].map((p) =>
      p._id === product._id ? product : p
    );
    setBag({ ids, products: updated });
  };

  const handleQuantityInc = (productId: string) => {
    const updated = products.map((p) => {
      if (p._id === productId) {
        p.quantity += 1;

        markAddedProducts(p);
      }

      return p;
    });

    setProducts(updated);
  };

  const handleQuantityDec = (productId: string) => {
    const updated = [...products].map((p) => {
      if (p._id === productId) {
        p.quantity -= 1;

        unmarkRemovedProducts(p);
      }

      return p;
    });

    setProducts(updated);
  };

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
            <ProductDetails
              info={product}
              onQuantityDecrease={handleQuantityDec}
              onQuantityIncrease={handleQuantityInc}
              productId={product._id}
              quantity={product.quantity}
            />
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
      <PageContainer>
        <ScrollToTopBtn />
        <Header
          bagCount={bag.products.length}
          onAddProduct={switchShowProductForm}
          onBagView={navigateToViewBag}
          onShowSettings={switchShowSettings}
          productsCount={productsCount}
          shopName={shop?.name}
        />
        <Grid>
          <CardSkeletons isLoading={isLoading} />
          {paginated.length ? (
            paginated.map((product, index) => (
              <ProductCard
                data={product}
                key={index}
                onClick={() => handleProductClick(product)}
                onEdit={() => handleEdit(product)}
                onQuantityDecrease={handleQuantityDec}
                onQuantityIncrease={handleQuantityInc}
                showButton={!isTheAuthor}
              />
            ))
          ) : (
            <Info show={!isLoading} />
          )}
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
      </PageContainer>
    </>
  );
};

export default ShopPage;
