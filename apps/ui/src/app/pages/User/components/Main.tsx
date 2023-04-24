import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useFetchUser } from '../../../hooks/useFetchUser';
import { Spinner, Snackbar } from '@mind-challenge4/component-module';
import { Content } from './Content';

interface Props {
  userId?: string;
}

export const Main = ({ userId }: Props) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const { isLoading, isError, error, data, forceRefetch } = useFetchUser({
    userId: userId || '',
    skip: userId === '' || !userId || userId === '0',
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
      {isLoading && userId !== '0' && (
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
      {(data && !isLoading && !isError) || userId === '0' ? (
        <Content user={data ? data : undefined} isLoading={isLoading} forceRefetch={forceRefetch}/>
      ) : null}
    </Box>
  );
};
