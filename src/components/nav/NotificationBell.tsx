import { Box, IconButton } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { BiBell } from 'react-icons/bi';

const NotificationBell = () => {
    const navigate = useNavigate();

  return (
    <Box style={{ position: 'relative' }}>
      <IconButton
        aria-label='notification-bell'
        borderRadius='full' 
        size="sm"
        display={{ lg: 'flex', md: 'none' }}
        icon={<BiBell />}
        mr={3}
        onClick={() => navigate('/notifications')}
      />
      <Box
        style={{
          position: 'absolute',
          top: '0',
          right: 13,
          backgroundColor: 'orange',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
        }}
      />
    </Box>
  );
};

export default NotificationBell;
