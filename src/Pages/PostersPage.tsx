import { useState } from "react";
import { Box } from "@chakra-ui/react";

import { Grid, Image, Modal, Text } from "../components";
import { CardContainer, CardSkeletons } from "../components/card";
import { paginate } from "../utils/paginate";
import { Pagination } from "../components/common";
import { useAppColorMode, usePosters } from "../hooks";

export interface Poster {
  image: string;
  phone?: string;
  speech?: string;
  position?: string;
}

const PostersPage = ({ query }: { query: string }) => {
  const [selected, setSelected] = useState<Poster>();
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const { posters } = usePosters();
  const { accentColor } = useAppColorMode();

  const handleClick = (poster: Poster) => {
    setSelected(poster);
    setShowDetails(true);
  };

  const filtered = query
    ? posters.filter((poster) =>
        poster?.position?.toLowerCase().includes(query.toLowerCase())
      )
    : posters;

  const paginated = paginate<Poster>(filtered, currentPage, pageSize);

  return (
    <>
      {selected && (
        <Modal
          content={
            <>
              <Image src={selected.image} borderRadius={5} />
              {selected.phone && (
                <Text my={1} textAlign="center" color={accentColor}>
                  Phone: {selected.phone}
                </Text>
              )}
              <Text>{selected.speech}</Text>
            </>
          }
          isOpen={showDetails}
          onModalClose={() => setShowDetails(false)}
          title={selected.position || "Poster Viewer"}
        />
      )}
      <Grid columns={{ sm: 1, md: 2 }}>
        <CardSkeletons isLoading={false} pageSize={4} />
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
          itemsCount={filtered.length}
          pageSize={pageSize}
        />
      </Box>
    </>
  );
};

export default PostersPage;
