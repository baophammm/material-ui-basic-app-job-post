import React, { useContext, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Avatar,
  CssBaseline,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Stack,
  InputAdornment,
  IconButton,
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { FTextField, FormProvider } from '../form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext, AuthContext } from '../App';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useRef } from 'react';

const ModalWrapperBox = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  // overflowY: 'scroll',
  WebkitOverflowScrolling: 'touch',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ModalBox = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.shape.borderRadius,
  width: '95%',
  maxWidth: '800px',
  padding: 10,
}));

const StyledSignInBox = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.shape.borderRadius,
  width: '100%',
  marginTop: 8,
  padding: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  background: theme.palette.secondary.dark,
  '&:hover': {
    background: theme.palette.secondary.darker,
  },
}));

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export default function SignInModal() {
  const modalRef = useRef();

  const { setIsSignedIn, loginData, setLoginData, location, useAuth } =
    useContext(AppContext);
  const auth = useContext(AuthContext);
  const signinLocation = useLocation();
  const from = signinLocation.state?.from?.pathname || '/';

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const defaultValues = loginData;
  const methods = useForm({ resolver: yupResolver(schema), defaultValues });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = data => {
    setIsSignedIn(true);
    if (from) {
      navigate(from, {
        state: { previousLocation: location.state.previousLocation },
        replace: true,
      });
    } else {
      navigate(from);
    }

    setLoginData({
      ...loginData,
      username: data.username,
      password: data.password,
    });
  };

  useEffect(() => {
    const observeRefValue = modalRef.current;
    disableBodyScroll(observeRefValue);
    return () => {
      if (observeRefValue) {
        enableBodyScroll(observeRefValue);
      }
    };
  }, []);

  return (
    <ModalWrapperBox ref={modalRef} onClick={() => navigate('/')}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <Container component="main">
          <CssBaseline />
          <StyledSignInBox>
            <Avatar
              sx={{ m: 1, color: 'primary.darker', bgcolor: 'secondary.main' }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" mb={2}>
              Sign in
            </Typography>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack
                spacing={3}
                xs={9}
                sx={{ width: '80vw', maxWidth: '500px' }}
              >
                <FTextField
                  name="username"
                  label="Username *"
                  sx={{ input: { color: 'primary.contrastText' } }}
                />
                <FTextField
                  name="password"
                  label="Password *"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={e => e.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    input: { color: 'primary.contrastText' },
                  }}
                />
                <StyledLoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Sign in
                </StyledLoadingButton>
              </Stack>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" color="secondary.main">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" color="secondary.main">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </FormProvider>
          </StyledSignInBox>
        </Container>
      </ModalBox>
    </ModalWrapperBox>
  );
}
