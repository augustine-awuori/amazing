import { useState } from "react";
import { Routes } from "react-router-dom";

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
                    <Routes></Routes>
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
