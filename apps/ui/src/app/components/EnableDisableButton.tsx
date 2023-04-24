import { Box, Typography } from '@mui/material';
import React from 'react';
import { SpinnerButton } from './SpinnerButton';

interface Props {
  onClick?: () => void;
  isLoading: boolean;
  title: string;
  conditionIsInactive: boolean;
}

export const EnableDisableButton = ({
  onClick,
  isLoading,
  title,
  conditionIsInactive,
}: Props) => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Box display="flex" gap="4px">
        <Box
          sx={{
            height: '20px',
            width: '20px',
            background: conditionIsInactive ? 'red' : 'green',
          }}
        />
        <Typography component="span">
          {conditionIsInactive ? 'Inactive' : 'Active'}
        </Typography>
      </Box>
      <SpinnerButton
        variant="contained"
        onClick={onClick}
        loading={isLoading}
        sx={{ padding: '2px 4px' }}
      >
        {conditionIsInactive ? `Activate ${title}` : `Inactivate ${title}`}
      </SpinnerButton>
    </Box>
  );
};
