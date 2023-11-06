import { ChangeEvent } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import {
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";

interface Props extends InputProps {
  onTextChange: (text: string) => void;
}

const SearchInput = ({ onTextChange, value, ...rest }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    onTextChange(event.target.value);
  };

  return (
    <InputGroup borderRadius={30} mt={1} mb={2}>
      {!value && (
        <InputLeftElement pointerEvents="auto">
          <IconButton
            borderRadius="30px"
            icon={<AiOutlineSearch w={1} h={1} />}
            aria-label="search-icon"
            transition="opacity 0.3s"
          />
        </InputLeftElement>
      )}
      <Input
        {...rest}
        borderRadius="30px"
        fontFamily="andika"
        transition="border-radius 0.3s"
        onTextChangeText={handleChange}
        onChange={handleChange}
        value={value}
      />
      <InputRightElement onClick={() => onTextChange("")}>
        <IconButton
          borderRadius="30px"
          opacity={value ? 1 : 0}
          icon={<AiOutlineClose />}
          aria-label="cancel-icon"
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
