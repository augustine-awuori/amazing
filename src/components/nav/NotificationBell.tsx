import { Box, IconButton } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { BiBell } from 'react-icons/bi';

import auth from '../../services/auth';
import useAppColorMode from '../../hooks/useAppColorMode';
 
const NotificationBell = () => {
  const { accentColor } = useAppColorMode();
  const navigate = useNavigate();
  
  if (!auth.getCurrentUser()) return null;

  return (
    <Box display={{ lg: 'block', md: 'none', base: 'none' }} pos='relative'>
      <IconButton
        aria-label='notification-bell'
        borderRadius='full' 
        size="sm"
        icon={<BiBell />}
        mr={3}
        onClick={() => navigate('/notifications')}
      />
      <Box
        bg={accentColor}
        borderRadius='50%'
        height='8px'
        pos='absolute'
        right={13}
        top={0}
        width='8px'
      />
    </Box>
  );
};

export default NotificationBell;
