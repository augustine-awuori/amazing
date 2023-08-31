import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Category } from "../hooks/useCategories";
import { Listing } from "../hooks/useListing";
import { Request } from "../hooks/useRequest";
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
} from "../contexts";

function AppRoutes(): React.JSX.Element {
  const [listings, setListings] = useState<Listing[]>([]);
  const [listing, setListing] = useState<Listing | undefined>();
  const [profileListings, setProfileListings] = useState<Listing[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [request, setRequest] = useState<Request | undefined>();
  const [profileUser, setProfileUser] = useState<User | undefined>();
  const [profileRequests, setProfileRequests] = useState<Request[]>([]);
  const [images, setImages] = useState<File[]>([]);

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
                    <ImagesContext.Provider value={{ images, setImages }}>
                      <Routes>
                        <Route
                          path="listings/:listingId"
                          element={<ListingDetailsPage />}
                        />
                        <Route
                          path="listings/new"
                          element={<ListingEditPage />}
                        />
                        <Route index element={<ListingsPage />} />
                        <Route
                          path="requests/:requestId"
                          element={<RequestDetailsPage />}
                        />
                        <Route
                          path="requests/new"
                          element={<RequestEditPage />}
                        />
                        <Route path="requests" element={<RequestsPage />} />
                        <Route path="about-app" element={<AboutAppPage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="logout" element={<LogoutPage />} />
                        <Route path="register" element={<RegisterPage />} />
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
                        <Route path="*" element={<NotFoundPage />} />
                      </Routes>
                    </ImagesContext.Provider>
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
