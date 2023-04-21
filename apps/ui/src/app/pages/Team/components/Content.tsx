import React from 'react';
import { Box, Typography } from '@mui/material';
import { TeamDTO } from '@mind-challenge4/share-types';
import { TeamForm } from './TeamForm';

interface Props {
  team?: TeamDTO;
  isLoading?: boolean;
}

export const Content = ({ team, isLoading }: Props) => {
  const title = (() => {
    if (isLoading) {
      return '';
    }

    return !team ? 'Create Team' : 'Edit Team';
  })();

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="20px"
      sx={(theme) => ({ padding: theme.spacing(2) })}
    >
      <Box>
        <Typography component="h2" sx={{ fontSize: '1.4rem' }}>
          {title}
        </Typography>
      </Box>
      <TeamForm team={team} isLoading={isLoading} />
    </Box>
  );
};
