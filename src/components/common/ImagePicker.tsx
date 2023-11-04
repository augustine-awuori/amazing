import { ChangeEvent } from "react";
import { Box, Input } from "@chakra-ui/react";
import { FaCamera } from "react-icons/fa";

interface Props {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  visible?: boolean;
}

const ImagePicker = ({ onChange, visible = true }: Props) =>
  visible ? (
    <Box
      border="1px dashed gray"
      borderRadius="md"
      width="100px"
      height="100px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
      mb={2}
      mr={2}
    >
      <Input
        type="file"
        accept="image/*"
        multiple
        style={{
          opacity: 0,
          position: "absolute",
          width: "100%",
          height: "100%",
          cursor: "pointer",
        }}
        onTextChangeText={onChange}
      />
      <FaCamera size={24} />
    </Box>
  ) : null;

export default ImagePicker;
