import React from 'react';
import { Box } from '@mui/material';
import { TeamDTO } from '@mind-challenge4/share-types';
import { TeamCard } from '../../../components/TeamCard';

interface Props {
  team?: TeamDTO;
  isLoading?: boolean;
}

export const TeamForm = ({ team, isLoading }: Props) => {
  let isNewTeam = true;
  if (team) {
    isNewTeam = false;
  }
  return (
    <Box>
      <TeamCard teamDto={team} useExtendedCard isNewTeam={isNewTeam} />
    </Box>
  );
};
