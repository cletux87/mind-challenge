import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Spinner, Snackbar } from '@mind-challenge4/component-module';
import { Content } from './Content';
import { useFetchAccount } from '../../../hooks/useFetchAccount';

interface Props {
  accountId?: string;
}

export const Main = ({ accountId }: Props) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const { isLoading, isError, error, data, forceRefetch } = useFetchAccount({
    accountId: accountId || '',
    skip: accountId === '' || !accountId || accountId === '0',
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
      {isLoading && accountId !== '0' && (
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
      {(data && !isLoading && !isError) || accountId === '0' ? (
        <Content
          account={data ? data : undefined}
          isLoading={isLoading}
          forceRefetch={forceRefetch}
        />
      ) : null}
    </Box>
  );
};
