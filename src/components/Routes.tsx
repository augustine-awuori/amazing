import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Category } from "../hooks/useCategories";
import { Listing } from "../hooks/useListing";
import { User } from "../hooks/useUser";
import AboutAppPage from "../Pages/AboutAppPage";
import CategoriesContext from "../contexts/CategoriesContext";
import ListingContext from "../contexts/ListingContext";
import ListingDetailsPage from "../Pages/ListingDetailsPage";
import ListingsContext from "../contexts/ListingsContext";
import ListingsPage from "../Pages/ListingsPage";
import LoginPage from "../Pages/LoginPage";
import LogoutPage from "../Pages/LogoutPage";
import NotFoundPage from "../Pages/NotFoundPage";
import NotReadyPage from "../Pages/NotReadyPage";
import ProfileEditPage from "../Pages/ProfileEditPage";
import ProfileListingsContext from "../contexts/ProfileListingsContext";
import ProfileListingsPage from "../Pages/ProfileListingsPage";
import ProfilePage from "../Pages/ProfilePage";
import ProfileRequestsContext from "../contexts/ProfileRequestsContext";
import ProfileRequestsPage from "../Pages/ProfileRequestsPage";
import ProfileUserContext from "../contexts/ProfileUserContext";
import RegisterPage from "../Pages/RegisterPage";
import RequestContext from "../contexts/RequestContext";
import RequestDetailsPage from "../Pages/RequestDetailsPage";
import RequestEditPage from "../Pages/RequestEditPage";
import RequestsContext from "../contexts/RequestsContext";
import RequestsPage from "../Pages/RequestsPage";

interface Props {
  user: User | null | undefined;
}

function AppRoutes({ user }: Props) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [listing, setListing] = useState<Listing>();
  const [myListings, setMyListings] = useState<Listing[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [request, setRequest] = useState<Request>();
  const [profileUser, setProfileUser] = useState<User>();
  const [profileRequests, setProfileRequests] = useState<Request[]>([]);

  return (
    <ListingsContext.Provider value={{ listings, setListings }}>
      <ListingContext.Provider value={{ listing, setListing }}>
        <ProfileListingsContext.Provider value={{ myListings, setMyListings }}>
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
                    <Routes>
                      <Route
                        path="listings/:listingId"
                        element={<ListingDetailsPage />}
                      />
                      <Route path="listings/new" element={<NotReadyPage />} />
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
                      <Route
                        path="logout"
                        element={<LogoutPage user={user} />}
                      />
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
