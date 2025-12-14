import React from 'react';
import { Box, CircularProgress } from '@mui/material';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ fullScreen = false }) => {
  const containerStyle = fullScreen
    ? {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }
    : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4rem',
      };

  return (
    <Box sx={containerStyle}>
      <CircularProgress 
        size={fullScreen ? 60 : 40}
        sx={{
          color: 'primary.main',
        }}
      />
    </Box>
  );
};

export default LoadingSpinner;
