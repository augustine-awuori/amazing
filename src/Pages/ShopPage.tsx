import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  CardContainer,
  CardSkeleton,
  Footer,
  Heading,
  PageContainer,
  StartChatBtn,
} from "../components";
import { paginate } from "../utils/paginate";
import { useBag, useCurrentUser, useProducts, useShop } from "../hooks";
import { Modal, Pagination, ScrollToTopBtn } from "../components/common";
import { NewProductForm, ProductUpdateForm } from "../components/forms";
import Grid from "../components/grid";
import Header from "../components/shops/ShopPageHeader";
import ProductCard, { Product } from "../components/shops/ProductCard";

const PAGE_SIZE = 6;

const ShopPage = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [showProductEditForm, setShowProductEditForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { bag, setBag } = useBag();
  const navigate = useNavigate();
  const { shop } = useShop();
  const [product, setProduct] = useState<Product>();
  const { isLoading, products, productsCount, setProducts } = useProducts(
    shop?._id
  );
  const authorId = shop?.author?._id;
  const isTheAuthor = useCurrentUser(authorId);

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

  const switchShowProductEditForm = () =>
    setShowProductEditForm(!showProductEditForm);

  const handleEdit = (product: Product) => {
    setProduct(product);
    setShowProductEditForm(true);
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
        isOpen={showProductEditForm}
        content={
          <ProductUpdateForm
            product={product}
            onDone={switchShowProductEditForm}
          />
        }
        onModalClose={switchShowProductEditForm}
      />
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
                onEdit={() => handleEdit(product)}
                onQuantityDecrease={handleQuantityDec}
                onQuantityIncrease={handleQuantityInc}
                showButton={!isTheAuthor}
              />
            ))
          ) : (
            <Heading>Products not found</Heading>
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
