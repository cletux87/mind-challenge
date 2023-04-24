import React from 'react';
import { Box, Typography } from '@mui/material';
import { UserDTO } from '@mind-challenge4/share-types';
import { UserCard } from '../../../components/UserCard';
import { useAuthUserContext } from '../../../../context/AuthUser';
import { useFetchMyLogs } from '../../../hooks/useFetchMyLogs';
import { LogsTable } from '../../../components/LogsTable';

interface Props {
  userDto: UserDTO;
}

export const Content = ({ userDto }: Props) => {
  const { state } = useAuthUserContext();

  const { isLoading: isLoadingLogs, data: logsData } = useFetchMyLogs({});
  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'column nowrap',
        height: '100%',
        width: '100%',
      }}
    >
      <Typography
        component="h2"
        sx={(theme) => ({
          margin: theme.spacing(3),
          fontSize: '1.5rem',
        })}
      >{`Welcome ${state.user?.username}`}</Typography>
      <Box sx={(theme) => ({ padding: theme.spacing(3) })}>
        <UserCard userDto={userDto} />
      </Box>
      <Box>
        <LogsTable
          logs={
            logsData?.totalResults && logsData.totalResults === 0
              ? []
              : logsData?.logs || []
          }
          isLoading={isLoadingLogs}
        />
      </Box>
    </Box>
  );
};
