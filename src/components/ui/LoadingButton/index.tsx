import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  loadingText,
  children,
  disabled,
  ...props
}) => {
  return (
    <Button
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <CircularProgress
          size={16}
          sx={{
            color: 'inherit',
            marginRight: 1,
          }}
        />
      )}
      {loading && loadingText ? loadingText : children}
    </Button>
  );
};

export default LoadingButton;
