import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  Typography,
} from '@mui/material';
import { LogDTO, TeamDTO, UserDTO } from '@mind-challenge4/share-types';
import { TeamForm } from './TeamForm';
import { client } from '../../../../services';
import { END_POINT_USERS } from '../../../../constants/url';
import { ReportDataTable } from '@mind-challenge4/component-module';
import { SpinnerButton } from '../../../components/SpinnerButton';
import { useNavigate } from 'react-router-dom';
import { LogsTable } from '../../../components/LogsTable';

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
  {
    textAlign: 'left',
    text: 'Action',
    accessor: 'id',
    customCell: () => {
      return <div>Add User</div>;
    },
    isLink: true,
    isClickable: true,
  },
];

const currentUserColumns = [
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
  {
    textAlign: 'left',
    text: 'Action',
    accessor: 'id',
    customCell: () => {
      return <div>Remove User</div>;
    },
    isLink: true,
    isClickable: true,
  },
];

interface Props {
  team?: TeamDTO;
  isLoading?: boolean;
  forceRefetch?: () => void;
}

export const Content = ({ team, isLoading, forceRefetch }: Props) => {
  const navigate = useNavigate();
  const [searchUserInput, setSearchUserInput] = useState('');
  const [isSearchUserLoading, setIsSearchUserLoading] = useState(false);
  const [searchUsers, setSearchUsers] = useState<UserDTO[]>([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [currentUsersIsLoading, setCurrentUsersIsLoading] = useState(false);
  const [currentUsers, setCurrentUsers] = useState<UserDTO[]>([]);
  const [logsIsLoading, setLogsIsLoading] = useState(false);
  const [logsData, setLogsData] = useState<LogDTO[]>([]);
  const [changeUserData, setChangeUserData] = useState({
    modalOpen: false,
    userId: 0,
    action: '',
  });
  const [changeTeamIsLoading, setChangeTeamIsLoading] = useState(false);

  useEffect(() => {
    if (team?.id) {
      setCurrentUsersIsLoading(true);
      client
        .get(`${END_POINT_USERS}?teamId=${team?.id}`)
        .then((data) => {
          setCurrentUsers(data.data.data);
        })
        .finally(() => setCurrentUsersIsLoading(false));
    }
  }, [team?.id]);

  useEffect(() => {
    if (team?.id) {
      setLogsIsLoading(true);
      client
        .get(`/api/logs/team/${team?.id}`)
        .then((data) => {
          setLogsData(data.data.data.logs);
        })
        .finally(() => setLogsIsLoading(false));
    }
  }, [team?.id]);

  const title = (() => {
    if (isLoading) {
      return '';
    }
    return !team ? 'Create Team' : 'Edit Team';
  })();

  const doSearchUsers = () => {
    setIsSearchUserLoading(true);
    client
      .get(
        `${END_POINT_USERS}?teamId=null${
          searchUserInput !== '' ? `&email=${searchUserInput}` : ''
        }`
      )
      .then((data) => {
        setSearchUsers(data.data.data);
      })
      .finally(() => setIsSearchUserLoading(false));
  };

  const changeUsersTeam = () => {
    setChangeTeamIsLoading(true);
    client
      .post('/api/team/changeMember', {
        teamId: changeUserData.action === 'add' ? team?.id : 0,
        userId: changeUserData.userId,
      })
      .then(() => {
        if (forceRefetch) {
          forceRefetch();
        }
      })
      .catch((err) => {
        console.log('ERROR');
      })
      .finally(() => {
        setChangeTeamIsLoading(false);
      });
  };

  const onSearchUsers = () => {
    doSearchUsers();
  };

  const onCellClickSearch = (cell: any) => {
    const id = cell.row.original.id;
    const header = cell.column.Header;
    if (header === 'Action') {
      setChangeUserData({
        modalOpen: true,
        userId: id,
        action: 'add',
      });
    } else {
      navigate(`/app/user/${id}`);
    }
  };

  const onCellClickCurrentUsers = (cell: any) => {
    const id = cell.row.original.id;
    const header = cell.column.Header;
    if (header === 'Action') {
      setChangeUserData({
        modalOpen: true,
        userId: id,
        action: 'remove',
      });
    } else {
      navigate(`/app/user/${id}`);
    }
  };

  const closeDialog = () => {
    setChangeUserData({
      modalOpen: false,
      userId: 0,
      action: '',
    });
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
      <TeamForm team={team} isLoading={isLoading} />
      {team?.id && (
        <Box display="flex" flexDirection="column">
          <Box display="flex" justifyContent="flex-end" marginBottom={2}>
            <Button
              onClick={() => setShowAddUser((prev) => !prev)}
              variant="contained"
              sx={{ padding: '4px 6px' }}
            >
              {showAddUser ? 'Do not Show add User' : 'Add User'}
            </Button>
          </Box>
          {showAddUser && (
            <React.Fragment>
              <Box
                display="flex"
                gap={1}
                justifyContent="flex-end"
                sx={{ marginBottom: '16px' }}
              >
                <Typography>Search User:</Typography>
                <Input
                  value={searchUserInput}
                  onChange={(event) => setSearchUserInput(event.target.value)}
                  onKeyDown={(e) =>
                    e.keyCode === 13 ? onSearchUsers() : undefined
                  }
                  disabled={isSearchUserLoading}
                />
              </Box>
              <ReportDataTable
                data={searchUsers || []}
                loading={isSearchUserLoading}
                columns={columns}
                onCellClick={onCellClickSearch}
              />
            </React.Fragment>
          )}
          <Box display="flex" flexDirection="column">
            <Card sx={{ padding: '8px' }}>
              <Typography sx={{ marginBottom: '8px' }}>
                Current Users
              </Typography>
              <Box marginBottom={2}>
                <ReportDataTable
                  data={currentUsers || []}
                  loading={currentUsersIsLoading}
                  columns={currentUserColumns}
                  onCellClick={onCellClickCurrentUsers}
                />
              </Box>
            </Card>
          </Box>
          <Box display="flex" flexDirection="column" sx={{ marginTop: 2 }}>
            <LogsTable isLoading={logsIsLoading} logs={logsData || []} />
          </Box>
        </Box>
      )}
      <Dialog open={changeUserData.modalOpen} onClose={() => closeDialog()}>
        <DialogTitle>
          <Typography>
            {changeUserData.action === 'add'
              ? 'Add User To Team'
              : 'Remove User from Team'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          Are you sure you want to continue with this operation?
        </DialogContent>
        <DialogActions>
          <SpinnerButton
            loading={changeTeamIsLoading}
            onClick={changeUsersTeam}
          >
            <Typography>
              {changeUserData.action === 'add' ? 'Add' : 'Remove'}
            </Typography>
          </SpinnerButton>
          <Button onClick={() => closeDialog()}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
