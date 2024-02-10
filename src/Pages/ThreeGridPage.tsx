import { Box, Flex, UseDisclosureProps } from "@chakra-ui/react";

import { BottomSheet, BottomSheetOpener } from "../components/common";
import { hideScrollBarCss } from "../data/general";
import { useNoGrid } from "../hooks";

interface Props extends UseDisclosureProps {
  SideBarContent: JSX.Element;
  RightSideBarContent: JSX.Element;
  isBottomSheetOpen: boolean;
  MainContent?: JSX.Element;
  OtherContents?: JSX.Element;
  onBottomSheetSwipeUp: () => void;
}

const ThreeGridPage = ({
  isBottomSheetOpen,
  MainContent,
  onBottomSheetSwipeUp,
  OtherContents,
  RightSideBarContent,
  SideBarContent,
  ...rest
}: Props) => {
  useNoGrid();

  return (
    <Box pos="relative">
      {OtherContents}
      <BottomSheetOpener onSwipeUp={onBottomSheetSwipeUp} />
      <BottomSheet
        Content={SideBarContent}
        isOpen={isBottomSheetOpen}
        {...rest}
      />
      <Flex height="100vh" pt={{ base: 3, md: 10 }}>
        <Box
          width={{ base: "100%", md: "20%" }}
          color="white"
          display={{ md: "none", lg: "flex", base: "none" }}
          flexDir={{ base: "row", md: "column" }}
          alignItems="center"
          overflowX="hidden"
          justifyContent="space-between"
          px={5}
          pb={8}
          pt={19}
        >
          {SideBarContent}
        </Box>

        <Flex
          css={hideScrollBarCss}
          flex="1"
          overflowY="auto"
          padding={{ base: "10px", md: "20px" }}
          flexDirection="column"
          borderX="1px solid gray"
          pt={45}
          h="100%"
        >
          {MainContent}
        </Flex>

        <Box
          display={{ lg: "block", md: "none", base: "none" }}
          width={{ base: "100%", md: "250px" }}
          padding="20px"
          overflowY="auto"
          css={hideScrollBarCss}
          mt={4}
        >
          {RightSideBarContent}
        </Box>
      </Flex>
    </Box>
  );
};

export default ThreeGridPage;
