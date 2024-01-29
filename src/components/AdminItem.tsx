import { Box, BoxProps } from "@chakra-ui/react";

const AdminItem = ({ children, ...rest }: BoxProps) => (
  <Box borderRadius={10} bg="gray.600" p={2} my={3} pb={3} {...rest}>
    {children}
  </Box>
);

export default AdminItem;
