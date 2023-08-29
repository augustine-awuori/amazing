import React from "react";

import { Listing } from "../hooks/useListing";
import { Request } from "../hooks/useRequest";
import { Category } from "../hooks/useCategories";
import { User } from "../hooks/useUser";

declare module "../contexts" {
  export const ListingsContext: React.Context<{
    listings: Listing[];
    setListings: React.Dispatch<React.SetStateAction<Listing[]>>;
  }>;
  export const ListingContext: React.Context<{
    listing: Listing | undefined;
    setListing: React.Dispatch<React.SetStateAction<Listing | undefined>>;
  }>;
  export const ProfileListingsContext: React.Context<{
    profileListings: Listing[];
    setProfileListings: React.Dispatch<React.SetStateAction<Listing[]>>;
  }>;
  export const CategoriesContext: React.Context<{
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  }>;
  export const RequestsContext: React.Context<{
    requests: Request[];
    setRequests: React.Dispatch<React.SetStateAction<Request[]>>;
  }>;
  export const RequestContext: React.Context<{
    request: Request | undefined;
    setRequest: React.Dispatch<React.SetStateAction<Request | undefined>>;
  }>;
  export const ProfileUserContext: React.Context<{
    profileUser: User | undefined;
    setProfileUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  }>;
  export const ProfileRequestsContext: React.Context<{
    profileRequests: Request[];
    setProfileRequests: React.Dispatch<
      React.SetStateAction<Request | undefined>
    >;
  }>;
}
