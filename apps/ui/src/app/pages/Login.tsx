import React, { useState, useEffect } from 'react';
import { Box, Button, Stack, Theme, Typography } from '@mui/material';
import { authenticate, doWhoami } from '../../services/user';
import { useAuthUserContext } from '../../context/AuthUser';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_ROUTE } from '../../core/Routes';
import {
  Logo,
  Loader,
  Spinner,
  Input,
} from '@mind-challenge4/component-module';
import LinkIcon from '../../assets/Link.svg';
import { AxiosError } from 'axios';

interface ErrorMessage {
  errors: string;
}

const isAxiosErrorMessage = (error: any): error is AxiosError<ErrorMessage> => {
  const newError = error as AxiosError;
  if (newError && newError.isAxiosError && newError.response) {
    return true;
  }
  return false;
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthRequestLogin, setIsAuthRequestLogin] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { state, dispatch } = useAuthUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.user?.id && state.isAuth) {
      navigate(DASHBOARD_ROUTE.fullRoute);
      return;
    }

    doWhoami({
      onError: () => setIsLoading(false),
      onSuccess: (me) => {
        if (me) {
          dispatch({
            type: 'SET_USERNAME.SUCCESS',
            payload: {
              email: me.email,
              role: me.role,
              id: me.id,
            },
          });
          navigate(DASHBOARD_ROUTE.fullRoute);
        }
        setIsLoading(false);
      },
    });
  }, []);

  const setAnError = (message: string) => {
    setIsError(true);
    setErrorMessage(message);
    setPassword('');
    setEmail('');
  };

  const handleLogin = async () => {
    setIsAuthRequestLogin(true);
    try {
      const response = await authenticate({ email, password });
      if (response.status === 200) {
        window.localStorage.setItem('jwt', response.data.jwt);
        dispatch({
          type: 'GET_USER.SUCCESS',
          payload: { username: email, jwt: response.data.jwt },
        });
        navigate(DASHBOARD_ROUTE.fullRoute);
      }
      if (response.status <= 400 && response.status < 500) {
        setAnError('User or Password are incorrect');
      }
    } catch (err) {
      // TODO: We need a log server such as
      // sentry or other tool in case we want to log
      // user errors
      console.log(err);
      if (isAxiosErrorMessage(err)) {
        const axiosError = err as AxiosError<ErrorMessage>;
        setAnError(
          axiosError.response?.data.errors ||
            'Something went wrong please try again later'
        );
      } else {
        setAnError('Something went wrong please try again later');
      }
    }
    setIsAuthRequestLogin(false);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ height: '100%', width: '100%' }}
      >
        <Spinner />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={(theme) => ({
        width: '100vw',
        height: '100vh',
        background: {
          sm: theme.palette.common.white,
          md: theme.palette.stationGray[200],
        },
      })}
    >
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', sm: '100%', md: '520px' },
        }}
      >
        <Box
          sx={(theme) => ({
            backgroundColor: theme.palette.common.white,
            p: '56px 100px 100px',
            borderRadius: 2,
          })}
        >
          <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="column" alignItems="center">
              <Stack direction="row" sx={(theme) => ({ mb: theme.spacing(9) })}>
                <Logo size="xs" />
                <Typography
                  style={{ fontWeight: 600 }}
                  sx={(theme) => ({ marginLeft: theme.spacing(1) })}
                >
                  Mind Challenge
                </Typography>
              </Stack>
              <Typography
                textAlign="center"
                sx={(theme) => ({
                  color: theme.palette.stationGray[900],
                  mb: theme.spacing(6),
                })}
                style={{ fontWeight: 500 }}
              >
                Sign in to your workspace
              </Typography>
              <Button
                sx={(theme) => ({
                  background: theme.palette.stationGray[100],
                  width: '100%',
                  mb: theme.spacing(5),
                  display: 'flex',
                  alignItems: 'center',
                })}
              >
                <Box component="img" alt="link image" src={LinkIcon} mr={1} />
                <Typography
                  style={{ fontWeight: 500 }}
                  sx={(theme) => ({ color: theme.palette.stationGray[700] })}
                >
                  Sign in with magic link
                </Typography>
              </Button>
              <Box
                sx={(theme) => ({
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  position: 'relative',
                  borderTop: `1px solid ${theme.palette.stationGray[300]}`,
                  width: '100%',
                  mb: theme.spacing(5),
                })}
              >
                <Typography
                  sx={(theme) => ({
                    position: 'absolute',
                    color: theme.palette.stationGray[400],
                    background: theme.palette.common.white,
                    mt: '-11px',
                    p: '0 10px',
                  })}
                >
                  Or use your email instead
                </Typography>
              </Box>
            </Box>
            {!isAuthRequestLogin && errorMessage !== '' && (
              <Box
                mb={3}
                mt={-1}
                sx={(theme) => ({
                  backgroundColor: theme.palette.stationRose[100],
                  border: `1px solid ${theme.palette.stationRed[500]}`,
                  borderRadius: theme.spacing(1),
                  padding: '12px',
                })}
              >
                <Typography
                  sx={(theme) => ({
                    color: theme.palette.stationRose[700],
                    textAlign: 'center',
                  })}
                >
                  {errorMessage}
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            mb={(theme: Theme) => theme.spacing(2)}
          >
            <Input
              label="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.currentTarget.value);
                setIsError(false);
              }}
              error={isError}
              disabled={isAuthRequestLogin}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            mt={(theme: Theme) => theme.spacing(2)}
            mb={(theme: Theme) => theme.spacing(1)}
          >
            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.currentTarget.value);
                setIsError(false);
              }}
              error={isError}
              disabled={isAuthRequestLogin}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleLogin();
                }
              }}
            />
          </Box>
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
          >
            <Typography
              sx={(theme) => ({
                color: theme.palette.stationBlue[600],
                mb: theme.spacing(5),
              })}
              style={{
                fontWeight: 500,
              }}
            >
              Forgot Password?
            </Typography>
          </Box>
          {isAuthRequestLogin && (
            <Box display="flex" flexBasis="100%" mb={3} mt={-1}>
              <Loader />
            </Box>
          )}
          <Box sx={{ width: '100%' }}>
            <Button
              variant="contained"
              onClick={handleLogin}
              sx={(theme) => ({
                background: theme.palette.stationBlue[600],
                width: '100%',
                textTransform: 'none',
              })}
              disabled={!(email && password)}
            >
              <Typography style={{ fontWeight: 500 }}>Sign in</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
