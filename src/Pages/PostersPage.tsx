import { useState } from "react";
import { Box } from "@chakra-ui/react";

import { Grid, Image, Modal } from "../components";
import { CardContainer, CardSkeletons } from "../components/card";
import { paginate } from "../utils/paginate";
import { Pagination } from "../components/common";
import { usePosters } from "../hooks";

export interface Poster {
  image: string;
}

const PostersPage = () => {
  const [selected, setSelected] = useState<Poster>();
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const { posters, isLoading } = usePosters();

  const handleClick = (poster: Poster) => {
    setSelected(poster);
    setShowDetails(true);
  };

  const paginated = paginate<Poster>(posters, currentPage, pageSize);

  return (
    <>
      {selected && (
        <Modal
          content={<Image src={selected.image} borderRadius={5} />}
          isOpen={showDetails}
          onModalClose={() => setShowDetails(false)}
          title="Poster Viewer"
        />
      )}
      <Grid columns={{ sm: 1, md: 2 }}>
        <CardSkeletons isLoading={isLoading} pageSize={4} />
        {paginated.map((poster, index) => (
          <CardContainer key={index}>
            <Box cursor="pointer" onClick={() => handleClick(poster)}>
              <Image src={poster.image} />
            </Box>
          </CardContainer>
        ))}
      </Grid>
      <Box>
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          itemsCount={paginated.length}
          pageSize={pageSize}
        />
      </Box>
    </>
  );
};

export default PostersPage;
