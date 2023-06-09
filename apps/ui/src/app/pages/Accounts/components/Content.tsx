import { AccountsDTO } from '@mind-challenge4/share-types';
import React from 'react';
import { Box, Button, Card, Typography } from '@mui/material';

import { ReportDataTable } from '@mind-challenge4/component-module';
import { useNavigate } from 'react-router-dom';

const columns = [
  {
    text: 'Client Name',
    accessor: 'clientName',
    isLink: true,
    isClickable: true,
  },
];

interface Props {
  accounts: AccountsDTO[];
  isLoading: boolean;
}

export const Content = ({ accounts, isLoading }: Props) => {
  const navigate = useNavigate();

  const onCellClick = (cell: any) => {
    const id = cell.row.original.id;
    navigate(`/app/account/${id}`);
  };

  const onAddUAccount = () => {
    navigate('/app/account/0');
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
        <Typography sx={{ fontSize: '1.5rem' }}>All Accounts</Typography>
        <Button variant="contained" onClick={onAddUAccount}>
          <Typography padding={0.5} fontSize="0.9rem">
            +Add Account
          </Typography>
        </Button>
      </Box>
      <Card sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
        <ReportDataTable
          data={accounts}
          loading={isLoading}
          columns={columns}
          onCellClick={onCellClick}
        />
      </Card>
    </Box>
  );
};
