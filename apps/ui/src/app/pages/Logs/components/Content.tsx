import { LogDTO } from '@mind-challenge4/share-types';
import React from 'react';
import { Box, Card, Typography } from '@mui/material';

import { ReportDataTable } from '@mind-challenge4/component-module';

const columns = [
  {
    text: 'Movement',
    accessor: 'movement',
  },
  {
    textAlign: 'left',
    text: 'Created At',
    accessor: 'createdAt',
  },
];

interface Props {
  logs: LogDTO[];
  isLoading: boolean;
}

export const Content = ({ logs, isLoading }: Props) => {
  return (
    <Box sx={(theme) => ({ padding: theme.spacing(2) })}>
      <Box
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: theme.spacing(1),
          marginBottom: theme.spacing(2),
        })}
      >
        <Typography sx={{ fontSize: '1.5rem' }}>All Logs</Typography>
      </Box>
      <Card sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
        <ReportDataTable data={logs} loading={isLoading} columns={columns} />
      </Card>
    </Box>
  );
};
