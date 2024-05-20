import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Bag, ProductsIds } from "../contexts/BagContext";
import { Category } from "../hooks/useCategories";
import { Listing } from "../hooks/useListing";
import { Order } from "../hooks/useOrder";
import { Request } from "../hooks/useRequest";
import { Shop } from "../hooks/useShop";
import { ShopProduct } from "../contexts/BagsContext";
import { User } from "../hooks/useUser";
import {
  AboutAppPage,
  AdminPage,
  ChatsAuthPage,
  ChatsLoginPage,
  ChatsPage,
  ChatsRegisterPage,
  EventsPage,
  ListingDetailsPage,
  ListingEditPage,
  ListingsPage,
  MyOrderPage,
  MyOrdersPage,
  MyShopsPage,
  NotFoundPage,
  NotificationsPage,
  ProductDetailsPage,
  ProfileEditPage,
  ProfileListingsPage,
  ProfilePage,
  ProfileRequestsPage,
  RequestEditPage,
  RequestsPage,
  ShopEditPage,
  ShopOrderPage,
  ShopOrders,
  ShopPage,
  ShoppingCartPage,
  ShopsPage,
} from "../Pages";
import {
  BagContext,
  BagsContext,
  CategoriesContext,
  EventsContext,
  ImagesContext,
  ListingContext,
  ListingsContext,
  NotificationsContext,
  OrderContext,
  OrdersContext,
  PostersContext,
  ProductsContext,
  ProfileListingsContext,
  ProfileRequestsContext,
  ProfileUserContext,
  RequestContext,
  RequestsContext,
  ShopContext,
  ShopsContext,
  StatusContext,
} from "../contexts";
import { Chat } from "../components/chat";
import { CheckScreenWidth, RedirectRoot } from "../navigation";
import { CreatedEvent } from "../services/events";
import { Notification } from "./Notification";
import { Poster } from "../Pages/PostersPage";
import { Product } from "../hooks/useProducts";
import { Status } from "../hooks/useStatus";
import CartContext, { Cart } from "../contexts/CartContext";
import ChatContext, { ChatDetails } from "../contexts/ChatContext";

function AppRoutes({ cartProducts, setCartProducts }: Cart) {
  const [bagProducts, setBagProducts] = useState<Product[]>([]);
  const [bags, setBags] = useState<ShopProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [chat, setChat] = useState<ChatDetails | undefined>();
  const [events, setEvents] = useState<CreatedEvent[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [listing, setListing] = useState<Listing | undefined>();
  const [listings, setListings] = useState<Listing[]>([]);
  const [order, setOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [posters, setPosters] = useState<Poster[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsIds, setProductsIds] = useState<ProductsIds>({});
  const [profileListings, setProfileListings] = useState<Listing[]>([]);
  const [profileRequests, setProfileRequests] = useState<Request[]>([]);
  const [profileUser, setProfileUser] = useState<User | undefined>();
  const [request, setRequest] = useState<Request | undefined>();
  const [requests, setRequests] = useState<Request[]>([]);
  const [shop, setShop] = useState<Shop | null>(null);
  const [shops, setShops] = useState<Shop[]>([]);
  const [status, setStatus] = useState<Status[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const handleBag = (bag: Bag) => {
    setBagProducts(bag.products);
    setProductsIds(bag.ids);
  };

  return (
    <NotificationsContext.Provider value={{ notifications, setNotifications }}>
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
                      <CartContext.Provider
                        value={{
                          cartProducts,
                          setCartProducts,
                        }}
                      >
                        <EventsContext.Provider value={{ events, setEvents }}>
                          <PostersContext.Provider
                            value={{ posters, setPosters }}
                          >
                            <ShopsContext.Provider value={{ shops, setShops }}>
                              <ShopContext.Provider value={{ shop, setShop }}>
                                <BagsContext.Provider value={{ bags, setBags }}>
                                  <BagContext.Provider
                                    value={{
                                      bag: {
                                        products: bagProducts,
                                        ids: productsIds,
                                      },
                                      setBag: handleBag,
                                    }}
                                  >
                                    <ImagesContext.Provider
                                      value={{ images, setImages }}
                                    >
                                      <ProductsContext.Provider
                                        value={{ products, setProducts }}
                                      >
                                        <OrdersContext.Provider
                                          value={{ orders, setOrders }}
                                        >
                                          <OrderContext.Provider
                                            value={{ order, setOrder }}
                                          >
                                            <StatusContext.Provider
                                              value={{ setStatus, status }}
                                            >
                                              <ChatContext.Provider
                                                value={{ setChat, chat }}
                                              >
                                                <Routes>
                                                  <Route
                                                    path="/admin"
                                                    element={<AdminPage />}
                                                  />
                                                  <Route
                                                    path="/events"
                                                    element={
                                                      <CheckScreenWidth
                                                        Component={
                                                          <EventsPage />
                                                        }
                                                      />
                                                    }
                                                  />
                                                  <Route
                                                    path="listings/:listingId"
                                                    element={
                                                      <ListingDetailsPage />
                                                    }
                                                  />
                                                  <Route
                                                    path="listings/new"
                                                    element={
                                                      <ListingEditPage />
                                                    }
                                                  />
                                                  <Route
                                                    path="/listings"
                                                    element={
                                                      <CheckScreenWidth
                                                        Component={
                                                          <ListingsPage />
                                                        }
                                                      />
                                                    }
                                                  />
                                                  <Route
                                                    path="requests/new"
                                                    element={
                                                      <RequestEditPage />
                                                    }
                                                  />
                                                  <Route
                                                    path="requests"
                                                    element={<RequestsPage />}
                                                  />
                                                  <Route
                                                    path="/shops/orders"
                                                    element={<MyShopsPage />}
                                                  />
                                                  <Route
                                                    path="/shops/orders/:shopId"
                                                    element={<ShopOrders />}
                                                  />
                                                  <Route
                                                    path="/shops/orders/:shopId/:orderId"
                                                    element={<ShopOrderPage />}
                                                  />
                                                  <Route
                                                    path="/shops/orders/my/:orderId"
                                                    element={<MyOrderPage />}
                                                  />
                                                  <Route
                                                    path="/shops/orders/my"
                                                    element={<MyOrdersPage />}
                                                  />
                                                  <Route
                                                    path="about-app"
                                                    element={<AboutAppPage />}
                                                  />
                                                  <Route
                                                    path="chats"
                                                    element={<ChatsPage />}
                                                  />
                                                  <Route
                                                    path="chats/:chatId"
                                                    element={<Chat />}
                                                  />
                                                  <Route
                                                    path="chats/auth"
                                                    element={<ChatsAuthPage />}
                                                  />
                                                  <Route
                                                    path="chats/auth/login"
                                                    element={<ChatsLoginPage />}
                                                  />
                                                  <Route
                                                    path="chats/auth/register"
                                                    element={
                                                      <ChatsRegisterPage />
                                                    }
                                                  />
                                                  <Route
                                                    path="notifications"
                                                    element={
                                                      <NotificationsPage />
                                                    }
                                                  />
                                                  <Route
                                                    path="profile/:userId/edit"
                                                    element={
                                                      <ProfileEditPage />
                                                    }
                                                  />
                                                  <Route
                                                    path="profile/:userId/listings"
                                                    element={
                                                      <ProfileListingsPage />
                                                    }
                                                  />
                                                  <Route
                                                    path="/profile/:userId/requests"
                                                    element={
                                                      <ProfileRequestsPage />
                                                    }
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
                                                    path="/shops/shopping-cart"
                                                    element={
                                                      <ShoppingCartPage />
                                                    }
                                                  />
                                                  <Route
                                                    path="/shops/:shopId/:productId"
                                                    element={
                                                      <ProductDetailsPage />
                                                    }
                                                  />
                                                  <Route
                                                    path="/shops/:shopId"
                                                    element={<ShopPage />}
                                                  />
                                                  <Route
                                                    path="/shops"
                                                    element={
                                                      <CheckScreenWidth
                                                        Component={
                                                          <ShopsPage />
                                                        }
                                                      />
                                                    }
                                                  />
                                                  <Route
                                                    index
                                                    element={<RedirectRoot />}
                                                  />
                                                  <Route
                                                    path="*"
                                                    element={<NotFoundPage />}
                                                  />
                                                </Routes>
                                              </ChatContext.Provider>
                                            </StatusContext.Provider>
                                          </OrderContext.Provider>
                                        </OrdersContext.Provider>
                                      </ProductsContext.Provider>
                                    </ImagesContext.Provider>
                                  </BagContext.Provider>
                                </BagsContext.Provider>
                              </ShopContext.Provider>
                            </ShopsContext.Provider>
                          </PostersContext.Provider>
                        </EventsContext.Provider>
                      </CartContext.Provider>
                    </CategoriesContext.Provider>
                  </ProfileRequestsContext.Provider>
                </ProfileUserContext.Provider>
              </RequestContext.Provider>
            </RequestsContext.Provider>
          </ProfileListingsContext.Provider>
        </ListingContext.Provider>
      </ListingsContext.Provider>
    </NotificationsContext.Provider>
  );
}

export default AppRoutes;
