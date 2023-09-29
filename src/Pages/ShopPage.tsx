import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  CardContainer,
  CardSkeleton,
  Footer,
  Info,
  PageContainer,
  StartChatBtn,
} from "../components";
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
import { Shop } from "../hooks/useShop";
import empty from "../utils/empty";
import Grid from "../components/grid";
import Header from "../components/shops/ShopPageHeader";
import ProductCard, { Product } from "../components/shops/product/Card";
import ProductDetails from "../components/shops/product/Details";
import service from "../services/shops";

const PAGE_SIZE = 6;

const ShopPage = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [showProductUpdateForm, setShowProductEditForm] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { bag, setBag } = useBag();
  const { shop: shopInfo } = useShop();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.length]);

  const skeletons = [1, 2, 3, 4, 5, 6];
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

  const unMarkRemovedProducts = (product: Product) => {
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
    setProducts(
      products.map((p) => {
        if (p._id === productId) {
          p.quantity += 1;

          markAddedProducts(p);
        }

        return p;
      })
    );
  };

  const handleQuantityDec = (productId: string) => {
    setProducts(
      [...products].map((p) => {
        if (p._id === productId) {
          p.quantity -= 1;

          unMarkRemovedProducts(p);
        }

        return p;
      })
    );
  };

  const switchShowProductForm = () => setShowProductForm(!showProductForm);

  const switchShowProductUpdateForm = () =>
    setShowProductEditForm(!showProductUpdateForm);

  const switchShowProductDetails = () =>
    setShowProductDetails(!showProductDetails);

  const handleEdit = (product: Product) => {
    setProduct(product);
    setShowProductEditForm(true);
  };

  const handleProductClick = (product: Product) => {
    setProduct(product);
    switchShowProductDetails();
  };

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
      <PageContainer>
        <ScrollToTopBtn />
        <Header
          authorId={authorId}
          bagCount={bag.products.length}
          onAddProduct={switchShowProductForm}
          onBagView={navigateToViewBag}
          productsCount={productsCount}
          shopName={shop?.name}
        />
        <Grid>
          {isLoading &&
            skeletons.map((skeleton) => (
              <CardContainer key={skeleton}>
                <CardSkeleton />
              </CardContainer>
            ))}
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
        <Footer
          name={`${shop?.name} Shop`}
          owner={`Shop Owner: ${shop?.author.name}`}
          verified={shop?.author?.isVerified}
        >
          {phoneNumber && <StartChatBtn phoneNumber={phoneNumber} />}
        </Footer>
      </PageContainer>
    </>
  );
};

export default ShopPage;
