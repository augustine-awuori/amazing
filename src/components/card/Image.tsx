import { Image } from "@chakra-ui/react";

interface Props {
  src: string | undefined;
}

const CardImage = ({ src }: Props) => (
  <Image src={src} style={{ maxHeight: "230px", objectFit: "cover" }} />
);

export default CardImage;
