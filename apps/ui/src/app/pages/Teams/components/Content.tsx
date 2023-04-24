import { TeamDTO } from '@mind-challenge4/share-types';
import React from 'react';
import { Box, Card, Typography } from '@mui/material';

import { ReportDataTable } from '@mind-challenge4/component-module';
import { useNavigate } from 'react-router-dom';

const columns = [
  {
    text: 'Team Name',
    accessor: 'teamName',
    isLink: true,
    isClickable: true,
  },
  {
    textAlign: 'left',
    text: 'Created At',
    accessor: 'createdAt',
  },
];

interface Props {
  users: TeamDTO[];
  isLoading: boolean;
}

export const Content = ({ users, isLoading }: Props) => {
  const navigate = useNavigate();

  const onCellClick = (cell: any) => {
    const id = cell.row.original.id;
    navigate(`/app/team/${id}`);
  };

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
        <Typography sx={{ fontSize: '1.5rem' }}>All Teams</Typography>
      </Box>
      <Card sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
        <ReportDataTable
          data={users}
          loading={isLoading}
          columns={columns}
          onCellClick={onCellClick}
        />
      </Card>
    </Box>
  );
};
