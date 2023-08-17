import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Category } from "../hooks/useCategories";
import { Listing } from "../hooks/useListings";
import { User } from "../hooks/useUser";
import CategoriesContext from "../context/CategoriesContext";
import ListingContext from "../context/ListingContext";
import ListingsContext from "../context/ListingsContext";
import ProfileListingsContext from "../context/ProfileListingsContext";
import ProfileRequestsContext from "../context/ProfileRequestsContext";
import ProfileUserContext from "../context/ProfileUserContext";
import RequestContext from "../context/RequestContext";
import RequestsContext from "../context/RequestsContext";
import NotFoundPage from "../Pages/NotFoundPage";
import ProfilePage from "../Pages/ProfilePage";
import ProfileRequestsPage from "../Pages/ProfileRequestsPage";
import ProfileListingsPage from "../Pages/ProfileListingsPage";
import ProfileEditPage from "../Pages/ProfileEditPage";
import RegisterPage from "../Pages/RegisterPage";
import LogoutPage from "../Pages/LogoutPage";
import LoginPage from "../Pages/LoginPage";
import AboutAppPage from "../Pages/AboutAppPage";
import RequestsPage from "../Pages/RequestsPage";
import RequestEditPage from "../Pages/RequestEditPage";
import RequestDetailsPage from "../Pages/RequestDetailsPage";
import ListingsPage from "../Pages/ListingsPage";
import NotReadyPage from "../Pages/NotReadyPage";
import ListingDetailsPage from "../Pages/ListingDetailsPage";

interface Props {
  user: User | null;
}

function AppRoutes() {
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
