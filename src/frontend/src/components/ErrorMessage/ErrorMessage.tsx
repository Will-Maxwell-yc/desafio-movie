import React from 'react';
import { Alert, Box, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <Box sx={{ padding: 4, display: 'flex', justifyContent: 'center' }}>
      <Alert 
        severity="error"
        sx={{
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'error.main',
          borderRadius: '12px',
          maxWidth: 600,
          width: '100%',
        }}
        action={
          onRetry && (
            <Button
              color="inherit"
              size="small"
              startIcon={<RefreshIcon />}
              onClick={onRetry}
              sx={{
                color: 'error.main',
                '&:hover': {
                  bgcolor: 'rgba(211, 47, 47, 0.1)',
                },
              }}
            >
              Tenta de novo
            </Button>
          )
        }
      >
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;
