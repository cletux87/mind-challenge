import React, { useState } from 'react';
import { Box, Button, Card, Input, Typography } from '@mui/material';
import { AccountsDTO } from '@mind-challenge4/share-types';
import { UserForm } from './AccountForm';
import { TeamCard } from '../../../components/TeamCard';
import { useFetchAccountTeams } from '../../../hooks/useFetchAccountTeams';
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
  account?: AccountsDTO;
  isLoading?: boolean;
}

export const Content = ({ account, isLoading }: Props) => {
  const [openNewTeam, setOpenNewTeam] = useState(false);
  const navigate = useNavigate();

  const teamsIdAsNumber = (() => {
    if (!account?.id) {
      return undefined;
    }
    return account.id;
  })();
  const { isLoading: isTeamsLoading, data: teamsData } = useFetchAccountTeams({
    accountId: teamsIdAsNumber,
  });

  const title = (() => {
    if (isLoading) {
      return '';
    }
    return !account ? 'Create Account' : 'Edit Account';
  })();

  const onCellClick = (cell: any) => {
    const id = cell.row.original.id;
    navigate(`/app/team/${id}`);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="20px"
      sx={(theme) => ({ padding: theme.spacing(2) })}
    >
      <Box>
        <Typography component="h2" sx={{ fontSize: '1.4rem' }}>
          {title}
        </Typography>
      </Box>
      <UserForm account={account} isLoading={isLoading} />
      {account?.id && (
        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            justifyContent="flex-end"
            sx={{ marginBottom: '16px' }}
          >
            <Button
              variant="contained"
              sx={{ padding: '4px 6px' }}
              onClick={() => setOpenNewTeam((prev) => !prev)}
            >
              {openNewTeam ? 'Close Add Team Form' : '+ Add Team'}
            </Button>
          </Box>
          {openNewTeam && (
            <Box>
              <TeamCard
                teamDto={undefined}
                useExtendedCard
                isNewTeam={true}
                accountId={account.id}
              />
            </Box>
          )}
          <Box>
            <Card sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
              <ReportDataTable
                data={teamsData || []}
                loading={isTeamsLoading}
                columns={columns}
                onCellClick={onCellClick}
              />
            </Card>
          </Box>
        </Box>
      )}
    </Box>
  );
};
