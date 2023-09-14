import { Category } from "../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { GridPageContainer, RequestGrid } from "../components";
import ScrollToTopBtn from "../components/common/ScrollToTopBtn";
import useRequest, { Request } from "../hooks/useRequest";

const RequestsPage = () => {
  const navigate = useNavigate();
  const { setRequest } = useRequest();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const navigateToDetails = (request: Request) => {
    setRequest(request);
    navigate(`/requests/${request._id}`);
  };

  return (
    <>
      <ScrollToTopBtn />
      <GridPageContainer
        onSelectCategory={setSelectedCategory}
        selectedItem={selectedCategory}
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
