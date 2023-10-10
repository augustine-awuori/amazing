import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Bag, ProductsIds } from "../contexts/BagContext";
import { Category } from "../hooks/useCategories";
import { Listing } from "../hooks/useListing";
import { Product } from "./shops/product/Card";
import { Request } from "../hooks/useRequest";
import { Shop } from "../hooks/useShop";
import { ShopProduct } from "../contexts/BagsContext";
import { User } from "../hooks/useUser";
import {
  ListingDetailsPage,
  ListingsPage,
  RequestDetailsPage,
  RequestEditPage,
  RequestsPage,
  AboutAppPage,
  LoginPage,
  LogoutPage,
  RegisterPage,
  ProfileEditPage,
  ProfileListingsPage,
  ProfileRequestsPage,
  ProfilePage,
  NotFoundPage,
  ListingEditPage,
  ShopsPage,
  ShopPage,
  ShopEditPage,
  ShoppingBagPage,
} from "../Pages";
import {
  ListingsContext,
  ListingContext,
  ProfileListingsContext,
  RequestsContext,
  RequestContext,
  ProfileUserContext,
  ProfileRequestsContext,
  CategoriesContext,
  ImagesContext,
  ShopsContext,
  ShopContext,
  BagsContext,
  BagContext,
  ProductsContext,
} from "../contexts";
import RedirectRoot from "../navigation/RedirectRoot";

function AppRoutes() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [listing, setListing] = useState<Listing | undefined>();
  const [profileListings, setProfileListings] = useState<Listing[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [request, setRequest] = useState<Request | undefined>();
  const [profileUser, setProfileUser] = useState<User | undefined>();
  const [profileRequests, setProfileRequests] = useState<Request[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [shop, setShop] = useState<Shop | null>(null);
  const [bags, setBags] = useState<ShopProduct[]>([]);
  const [bagProducts, setBagProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsIds, setProductsIds] = useState<ProductsIds>({});

  const handleBag = (bag: Bag) => {
    setBagProducts(bag.products);
    setProductsIds(bag.ids);
  };

  return (
    <ListingsContext.Provider value={{ listings, setListings }}>
      <ListingContext.Provider value={{ listing, setListing }}>
        <ProfileListingsContext.Provider
          value={{ profileListings, setProfileListings }}
        >
          <RequestsContext.Provider value={{ requests, setRequests }}>
            <RequestContext.Provider value={{ request, setRequest }}>
              <ProfileUserContext.Provider
                value={{ profileUser, setProfileUser }}
              >
                <ProfileRequestsContext.Provider
                  value={{ profileRequests, setProfileRequests }}
                >
                  <CategoriesContext.Provider
                    value={{ categories, setCategories }}
                  >
                    <ShopsContext.Provider value={{ shops, setShops }}>
                      <ShopContext.Provider value={{ shop, setShop }}>
                        <BagsContext.Provider value={{ bags, setBags }}>
                          <BagContext.Provider
                            value={{
                              bag: { products: bagProducts, ids: productsIds },
                              setBag: handleBag,
                            }}
                          >
                            <ImagesContext.Provider
                              value={{ images, setImages }}
                            >
                              <ProductsContext.Provider
                                value={{ products, setProducts }}
                              >
                                <Routes>
                                  <Route
                                    path="listings/:listingId"
                                    element={<ListingDetailsPage />}
                                  />
                                  <Route
                                    path="listings/new"
                                    element={<ListingEditPage />}
                                  />
                                  <Route
                                    path="/listings"
                                    element={<ListingsPage />}
                                  />
                                  <Route
                                    path="requests/:requestId"
                                    element={<RequestDetailsPage />}
                                  />
                                  <Route
                                    path="requests/new"
                                    element={<RequestEditPage />}
                                  />
                                  <Route
                                    path="requests"
                                    element={<RequestsPage />}
                                  />
                                  <Route
                                    path="about-app"
                                    element={<AboutAppPage />}
                                  />
                                  <Route path="login" element={<LoginPage />} />
                                  <Route
                                    path="logout"
                                    element={<LogoutPage />}
                                  />
                                  <Route
                                    path="register"
                                    element={<RegisterPage />}
                                  />
                                  <Route
                                    path="profile/:userId/edit"
                                    element={<ProfileEditPage />}
                                  />
                                  <Route
                                    path="profile/:userId/listings"
                                    element={<ProfileListingsPage />}
                                  />
                                  <Route
                                    path="/profile/:userId/requests"
                                    element={<ProfileRequestsPage />}
                                  />
                                  <Route
                                    path="/profile/:userId"
                                    element={<ProfilePage />}
                                  />
                                  <Route
                                    path="/shops/new"
                                    element={<ShopEditPage />}
                                  />
                                  <Route
                                    path="/shops/:shopId/my-bag"
                                    element={<ShoppingBagPage />}
                                  />
                                  <Route
                                    path="/shops/:shopId"
                                    element={<ShopPage />}
                                  />
                                  <Route
                                    path="/shops"
                                    element={<ShopsPage />}
                                  />
                                  <Route index element={<RedirectRoot />} />
                                  <Route path="*" element={<NotFoundPage />} />
                                </Routes>
                              </ProductsContext.Provider>
                            </ImagesContext.Provider>
                          </BagContext.Provider>
                        </BagsContext.Provider>
                      </ShopContext.Provider>
                    </ShopsContext.Provider>
                  </CategoriesContext.Provider>
                </ProfileRequestsContext.Provider>
              </ProfileUserContext.Provider>
            </RequestContext.Provider>
          </RequestsContext.Provider>
        </ProfileListingsContext.Provider>
      </ListingContext.Provider>
    </ListingsContext.Provider>
  );
}

export default AppRoutes;
