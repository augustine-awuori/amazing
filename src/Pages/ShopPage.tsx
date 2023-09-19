import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "@chakra-ui/react";

import {
  CardContainer,
  CardSkeleton,
  Footer,
  PageContainer,
  StartChatBtn,
} from "../components";
import { paginate } from "../utils/paginate";
import { useBag, useShop } from "../hooks";
import { Modal, Pagination, ScrollToTopBtn } from "../components/common";
import Grid from "../components/grid";
import { ShopPageHeader as Header } from "../components/shops";
import pic1 from "../assets/book1.png";
import pic2 from "../assets/book2.png";
import ProductCard, { Product } from "../components/shops/ProductCard";

const x: Product[] = [
  {
    _id: "1",
    name: "The Richest Man In Babylon",
    price: 19.99,
    image: pic2,
    quantity: 0,
  },
  {
    _id: "2",
    name: "More Important Than Money",
    price: 10.99,
    image: pic1,
    quantity: 0,
  },
  {
    _id: "3",
    name: "The Richest Man In Babylon Version 2",
    price: 29.99,
    image: pic2,
    quantity: 0,
  },
];

const PAGE_SIZE = 6;

const ShopPage = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState(x);
  const { shop } = useShop();
  const { bag, setBag } = useBag();
  const navigate = useNavigate();

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
      [...products].map((p) => {
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

  return (
    <>
      <Modal
        isOpen={showProductForm}
        onModalClose={() => setShowProductForm(false)}
        title="New Product"
        content={<></>}
        primaryBtnLabel="Save Product"
        onPrimaryClick={() => {}}
        secondaryBtnLabel="Cancel"
        onSecondaryClick={() => setShowProductForm(false)}
      />
      <PageContainer>
        <ScrollToTopBtn />
        <Header
          bagCount={bag.products.length}
          onAddProduct={() => setShowProductForm(true)}
          onBagView={navigateToViewBag}
          productsCount={x.length}
          shopName={shop?.name}
        />
        <Grid>
          {false &&
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
                onQuantityDecrease={handleQuantityDec}
                onQuantityIncrease={handleQuantityInc}
              />
            ))
          ) : (
            <Heading>Products not found</Heading>
          )}
        </Grid>
        <Pagination
          itemsCount={x.length}
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
