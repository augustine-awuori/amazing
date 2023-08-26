import React from "react";
import { Box, Center, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

interface Props {
  images: string[] | undefined;
}

export default function ImageSlider({ images }: Props) {
  const [slider, setSlider] = React.useState<Slider | null>(null);

  const top = useBreakpointValue({ base: "50%", md: "50%" });
  const side = useBreakpointValue({ base: "10%", md: "10px" });

  if (!images) return null;

  return (
    <Center>
      <Box
        position="relative"
        w="100%"
        h={{ base: "500px", md: "500px" }} // Adjust the height as needed
        maxW="500px"
        overflow="hidden"
      >
        {/* CSS files for react-slick */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        {/* Left Icon */}
        <IconButton
          aria-label="left-arrow"
          colorScheme="messenger"
          borderRadius="full"
          position="absolute"
          left={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickPrev()}
        >
          <BiLeftArrowAlt />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          colorScheme="messenger"
          borderRadius="full"
          position="absolute"
          right={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickNext()}
        >
          <BiRightArrowAlt />
        </IconButton>
        <Slider {...settings} ref={setSlider}>
          {images.map((url, index) => (
            <Box
              key={index}
              height={"2xl"}
              position="relative"
              objectFit="contain"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="contain"
              backgroundImage={`url(${url})`}
            />
          ))}
        </Slider>
      </Box>
    </Center>
  );
}
