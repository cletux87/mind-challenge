import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Snackbar } from '@mind-challenge4/component-module';
import { Content } from './Content';
import { useFetchLogs } from '../../../hooks/useFetchLogs';

export const Main = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const { isLoading, isError, error, data } = useFetchLogs({});

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

      {data && !isError && (
        <Content logs={data ? data : []} isLoading={isLoading} />
      )}
    </Box>
  );
};
