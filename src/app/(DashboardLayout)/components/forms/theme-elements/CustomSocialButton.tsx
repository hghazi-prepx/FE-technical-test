import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface CustomSocialButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const CustomSocialButton: React.FC<CustomSocialButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      variant="outlined"
      fullWidth
      sx={{
        border: '1px solid #e0e0e0',
        color: '#666',
        '&:hover': {
          border: '1px solid #999',
          backgroundColor: '#f5f5f5',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomSocialButton;
