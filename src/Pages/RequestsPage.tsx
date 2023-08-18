import { useState } from "react";
import { Category } from "../hooks/useCategories";
import AsideCategoryList from "../components/AsideCategoryList";
import PageContainer from "../components/PageContainer";
import { Box, HStack } from "@chakra-ui/react";
import CategorySelector from "../components/CategorySelector";
import ColorSwitchMode from "../components/ColorSwitchMode";
import GridHeading from "../components/GridHeading";
import RequestGrid from "../components/RequestGrid";
import useRequest, { Request } from "../hooks/useRequest";
import { useNavigate } from "react-router-dom";

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
    <PageContainer
      Aside={
        <AsideCategoryList
          onSelectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
      }
    >
      <>
        <Box marginY={1} paddingLeft={2}>
          <Box display={{ md: "none", lg: "block" }}>
            <GridHeading selectedCategory={selectedCategory} />
          </Box>
          <HStack justifyContent="space-between" marginTop={3}>
            <Box display={{ lg: "none" }}>
              <CategorySelector
                onSelectCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
              />
            </Box>
            <ColorSwitchMode />
          </HStack>
        </Box>
        <RequestGrid
          onRequestClick={navigateToDetails}
          selectedCategory={selectedCategory}
        />
      </>
    </PageContainer>
  );
};

export default RequestsPage;
