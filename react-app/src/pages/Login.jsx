import { useState } from 'react';
import { Formik } from 'formik';
import {
  Box,
  TextField,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import logo from '../images/logo-login.svg';
import { useNavigate } from 'react-router-dom';
import { loginValidationSchema } from '../validators/loginValidator';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={loginValidationSchema}
      onSubmit={(values) => {
        const userToken = 'my-secret-token-123';
        localStorage.setItem('token', userToken);
        navigate('/productsTable');
      }}
    >
      {({ values, handleChange, handleSubmit, errors, touched }) => (
        <Box component='form' onSubmit={handleSubmit} sx={{ margin: 'auto' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'white',
              width: '400px',
              alignItems: 'center',
              padding: '80px 100px',
            }}
          >
            <Box sx={{ marginBottom: '85px' }}>
              <img src={logo} alt='logo rozetka' />
            </Box>
            <TextField
              name='username'
              label='Username'
              variant='outlined'
              value={values.username}
              onChange={handleChange}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
              sx={{
                bgcolor: '#D9D9D9',
                width: '277px',
                marginBottom: '46px',
                borderRadius: '0',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                  {
                    border: 'none',
                  },
              }}
            />
            <FormControl
              sx={{
                m: 1,
                bgcolor: '#D9D9D9',
                width: '277px',
                marginBottom: '36px',
                borderRadius: '0',
              }}
              variant='outlined'
            >
              <InputLabel htmlFor='outlined-adornment-password'>
                Password
              </InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label={
                        showPassword
                          ? 'hide the password'
                          : 'display the password'
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label='Password'
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
              />
              {touched.password && errors.password && (
                <Box sx={{ color: 'red', fontSize: '12px', mt: 1 }}>
                  {errors.password}
                </Box>
              )}
            </FormControl>
            <Button
              type='submit'
              variant='contained'
              sx={{
                padding: '13px 100px',
                color: 'white',
                fontWeight: '700',
                fontSize: '24px',
                textTransform: 'capitalize',
                width: '277px',
                borderRadius: '0',
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default Login;
