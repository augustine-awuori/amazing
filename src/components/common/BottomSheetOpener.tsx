import React, { useState } from "react";
import { Box } from "@chakra-ui/react";

interface Props {
  onSwipeUp: () => void;
}

const BottomSheetOpener = ({ onSwipeUp }: Props) => {
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  // Function to handle touch start event
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  // Function to handle touch move event
  const handleTouchMove = (e: React.TouchEvent) => {
    // Check if touchStartY is not null
    if (touchStartY !== null) {
      // Calculate vertical distance moved
      const deltaY = e.touches[0].clientY - touchStartY;

      // If the vertical distance moved exceeds a threshold, call onSwipeUp function
      if (deltaY < -50) {
        // Call outward function when swipe-up gesture is detected
        onSwipeUp();
        // Reset touch start position
        setTouchStartY(null);
      }
    }
  };

  // Function to handle touch end event
  const handleTouchEnd = () => {
    // Reset touch start position
    setTouchStartY(null);
  };

  // Dynamically calculate styles based on touch events
  const getDynamicStyles = () => {
    const dynamicStyles: React.CSSProperties = {};

    // If touchStartY is not null (i.e., touch event is active)
    if (touchStartY !== null) {
      // Reduce horizontal size
      dynamicStyles.width = "20%";
      // Lift above original vertical position
      dynamicStyles.bottom = 15;
    }

    return dynamicStyles;
  };

  return (
    <Box
      display={{ md: "block", lg: "none" }}
      py={3}
      pos="absolute"
      bottom={2}
      w="30%"
      zIndex={10}
      left="50%"
      onClick={onSwipeUp}
    >
      <Box
        cursor="grab"
        h={1.5}
        bg="orange.400"
        borderRadius="full"
        transform="translateX(-50%)"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={getDynamicStyles()}
      />
    </Box>
  );
};

export default BottomSheetOpener;
