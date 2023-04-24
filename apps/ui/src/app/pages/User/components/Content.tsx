import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { UserDTO } from '@mind-challenge4/share-types';
import { UserForm } from './UserForm';
import { changeActiveUser } from '../../../../services/user';
import { useFetchUserLogs } from '../../../hooks/useFetchUserLogs';
import { LogsTable } from '../../../components/LogsTable';
import { EnableDisableButton } from '../../../components/EnableDisableButton';

interface Props {
  user?: UserDTO;
  isLoading?: boolean;
  forceRefetch: () => void;
}

export const Content = ({ user, isLoading, forceRefetch }: Props) => {
  const [isLocalLoading, setLocalIsLoading] = useState(false);
  const [isLocalIsError, setLocalIsError] = useState(false);

  const userIdAsNumber = (() => {
    if (!user?.id) {
      return undefined;
    }
    return user.id;
  })();
  const { isLoading: isLoadingLogs, data: logsData } = useFetchUserLogs({
    userId: userIdAsNumber,
  });

  const title = (() => {
    if (isLoading) {
      return '';
    }
    return !user ? 'Create User' : 'Edit User';
  })();

  const handleActivate = () => {
    if (user?.id) {
      const active = !!user?.endDate;
      const activeStr = active ? 'true' : 'false';
      setLocalIsLoading(true);
      setLocalIsError(false);
      changeActiveUser({ id: user?.id, active: activeStr })
        .then(() => {
          forceRefetch();
        })
        .catch(() => {
          setLocalIsError(true);
        })
        .finally(() => {
          setLocalIsLoading(false);
        });
    }
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
      <UserForm user={user} isLoading={isLoading} />
      {!isLoading && user && (
        <EnableDisableButton
          onClick={handleActivate}
          title="User"
          isLoading={isLocalLoading}
          conditionIsInactive={!!user?.endDate}
        />
      )}
      <Box>
        <LogsTable
          logs={
            logsData?.totalResults && logsData.totalResults === 0
              ? []
              : logsData?.logs || []
          }
          isLoading={isLoadingLogs}
        />
      </Box>
    </Box>
  );
};
