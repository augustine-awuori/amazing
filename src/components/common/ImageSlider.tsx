import { useState } from "react";
import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
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
interface ButtonProps {
  children: JSX.Element;
  left?: boolean;
}

export default function ImageSlider({ images }: Props) {
  const [slider, setSlider] = useState<Slider | null>(null);

  const side = useBreakpointValue({ base: "10%", md: "10px" });

  const Button = ({ children, left = false }: ButtonProps) => (
    <IconButton
      aria-label={left ? "left-arrow" : "right-arrow"}
      colorScheme="messenger"
      borderRadius="full"
      position="absolute"
      left={left ? side : undefined}
      fontFamily="andika"
      right={left ? undefined : side}
      bottom={side}
      zIndex={2}
      onClick={() => slider?.slickPrev()}
    >
      {children}
    </IconButton>
  );

  if (!images) return null;

  return (
    <Box w="100%" maxW="500px" overflow="hidden" position="relative">
      <Slider {...settings} ref={setSlider}>
        {images.map((url, index) => (
          <Box
            key={index}
            height={{ base: "300px", md: "500px" }}
            position="relative"
            objectFit="contain"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="contain"
            backgroundImage={`url(${url})`}
          />
        ))}
      </Slider>
      <Button left>
        <BiLeftArrowAlt />
      </Button>
      <Button>
        <BiRightArrowAlt />
      </Button>
    </Box>
  );
}
