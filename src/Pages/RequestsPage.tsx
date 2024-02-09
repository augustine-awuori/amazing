import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Category } from "../hooks/useCategories";
import {
  RequestGrid,
  ListingCategoriesGridPageContainer as GridPageContainer,
  NewItemButton as NewRequestButton,
  Text,
} from "../components";
import { useAppColorMode } from "../hooks";
import ScrollToTopBtn from "../components/common/ScrollToTopBtn";
import useRequest, { Request } from "../hooks/useRequest";

const RequestsPage = () => {
  const navigate = useNavigate();
  const { setRequest } = useRequest();
  const { accentColor } = useAppColorMode();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const navigateToDetails = (request: Request) => {
    setRequest(request);
    navigate(`/requests/${request._id}`);
  };

  const Heading =
    "Listings' Requests (you can't find it? request it for someone to list, it just for you)";

  const MoreInfo = (
    <>
      <Text fontSize={22} display={{ base: "block", md: "none" }} mb={1}>
        {Heading}
      </Text>
      <Text
        color={accentColor}
        fontSize={20}
        cursor="pointer"
        onClick={() => navigate("/listings")}
      >
        Tap to see what others have already listed
      </Text>
    </>
  );

  return (
    <>
      <ScrollToTopBtn />
      <NewRequestButton pageUrl="/requests" />
      <GridPageContainer
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        gridHeadingLabel={Heading}
        MoreInfo={MoreInfo}
      >
        <RequestGrid
          onRequestClick={navigateToDetails}
          selectedCategory={selectedCategory}
        />
      </GridPageContainer>
    </>
  );
};

export default RequestsPage;
