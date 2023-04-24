import React, {useState} from 'react';
import { Box, Typography } from '@mui/material';
import { UserDTO } from '@mind-challenge4/share-types';
import { UserForm } from './UserForm';
import { changeActiveUser } from '../../../../services/user';
import { SpinnerButton } from '../../../components/SpinnerButton';

interface Props {
  user?: UserDTO;
  isLoading?: boolean;
  forceRefetch: () => void
}

export const Content = ({ user, isLoading, forceRefetch }: Props) => {
  const [isLocalLoading, setLocalIsLoading] = useState(false)
  const [isLocalIsError, setLocalIsError] = useState(false)

  const title = (() => {
    if (isLoading) {
      return '';
    }
    return !user ? 'Create User' : 'Edit User';
  })();

  const handleActivate = () => {
    if(user?.id){
      const active = !!user?.endDate
      const activeStr = active ? "true" : "false"
      setLocalIsLoading(true)
      setLocalIsError(false)
      changeActiveUser({id: user?.id, active: activeStr})
      .then(()=>{
        forceRefetch()
      })
      .catch(()=>{
        setLocalIsError(true)
      })
      .finally(()=>{
        setLocalIsLoading(false)
      })
    }
  }

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
      {
        !isLoading && user &&
        <Box display='flex' justifyContent='space-between'>
          <Box display='flex' gap='4px'>
            <Box sx={{height:'20px', width:'20px', background: user?.endDate ? 'red':'green' }}/>
            <Typography component='span'>{user?.endDate ? 'Inactive':'Active' }</Typography>
          </Box>
          <SpinnerButton  variant="contained" onClick={handleActivate} loading={isLocalLoading}>
            {user?.endDate ? 'Activate User': 'Inactivate User' }
          </SpinnerButton>
        </Box>
      }
    </Box>
  );
};