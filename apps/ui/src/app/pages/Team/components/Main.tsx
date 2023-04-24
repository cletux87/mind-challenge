import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Spinner, Snackbar } from '@mind-challenge4/component-module';
import { Content } from './Content';
import { useFetchTeam } from '../../../hooks/useFetchTeam';

interface Props {
  teamId?: string;
}

export const Main = ({ teamId }: Props) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const { isLoading, isError, error, data, forceRefetch } = useFetchTeam({
    teamId: teamId || '',
    skip: teamId === '' || !teamId || teamId === '0',
  });

  useEffect(() => {
    if (isError !== snackbarOpen) {
      setSnackbarOpen(isError);
    }
  }, [isError, snackbarOpen]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      width="100%"
      sx={(theme) => ({ background: theme.palette.grey[100] })}
    >
      <Snackbar
        onClose={closeSnackbar}
        open={snackbarOpen}
        text={`${error}` || ''}
        severity={'error'}
      />
      {isLoading && teamId !== '0' && (
        <Box
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box>
            <Spinner />
          </Box>
        </Box>
      )}
      {(data && !isLoading && !isError) || teamId === '0' ? (
        <Content
          team={data ? data : undefined}
          isLoading={isLoading}
          forceRefetch={forceRefetch}
        />
      ) : null}
    </Box>
  );
};
