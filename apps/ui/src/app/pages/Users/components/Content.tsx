import { UserDTO } from '@mind-challenge4/share-types';
import React from 'react';
import { Box, Button, Card, Typography } from '@mui/material';

import { ReportDataTable } from '@mind-challenge4/component-module';
import { useNavigate } from 'react-router-dom';

const columns = [
  {
    text: 'Email',
    accessor: 'email',
    isLink: true,
    isClickable: true,
  },
  {
    textAlign: 'left',
    text: 'Name',
    accessor: 'firstName',
  },
  {
    textAlign: 'left',
    text: 'Last Name',
    accessor: 'lastName',
  },
  {
    textAlign: 'left',
    text: 'Role',
    accessor: 'role',
  },
  {
    textAlign: 'left',
    text: 'Active',
    accessor: 'endDate',
    customCell: (value?: string) => {
      return <div>{value && value !== '' ? 'No' : 'Yes'}</div>;
    },
  },
];

interface Props {
  users: UserDTO[];
  isLoading: boolean;
}

export const Content = ({ users, isLoading }: Props) => {
  const navigate = useNavigate();

  const onCellClick = (cell: any) => {
    const id = cell.row.original.id;
    navigate(`/app/user/${id}`);
  };

  const onAddUser = () => {
    navigate('/app/user/0');
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
        <Typography sx={{ fontSize: '1.5rem' }}>All Users</Typography>
        <Button variant="contained" onClick={onAddUser}>
          <Typography padding={0.5} fontSize="0.9rem">
            +Add User
          </Typography>
        </Button>
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
