import React, { useEffect, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { signIn } from '../../features/userThunk';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { setCurrentPage } from '../../features/dataSlice';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './sign-in.css';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector((state) => state.userState.user);
  const authError = useAppSelector(
    (state) => state.userState.authorizationError
  );
  const authLoading = useAppSelector((state) => state.userState.signInLoading);
  const [state, setState] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = React.useState(false);

  useEffect(() => {
    dispatch(setCurrentPage('Логин'));
  }, [dispatch]);

  useEffect(() => {
    if (user) navigate('/goods');
  }, [navigate, user, location.pathname]);

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const submitFormHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(signIn(state));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ paddingTop: '5%' }}>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Вход в систему
        </Typography>
        <Box
          className="sign-in-form"
          component="form"
          onSubmit={submitFormHandler}
          sx={{ mt: 3 }}
        >
          <TextField
            label="Имя пользователя"
            name="username"
            value={state.username}
            onChange={inputChangeHandler}
            required
            autoComplete={''}
          />
          <FormControl variant="outlined" required>
            <InputLabel htmlFor="outlined-adornment-password">
              Пароль
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Пароль"
              onChange={inputChangeHandler}
              value={state.password}
              name="password"
            />
          </FormControl>
          {authError && <Alert severity="error">{authError}</Alert>}
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!state.username || !state.password}
            loading={authLoading}
          >
            Логин
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};
export default SignIn;
