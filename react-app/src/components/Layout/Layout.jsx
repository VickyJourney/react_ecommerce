import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import {
  createTheme,
  Container,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#37b86c',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#37b86c',
        },
      },
    },
  },
});

const Layout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!isLoginPage && <Header />}
      <Container component='main' sx={{ minHeight: '100vh', display: 'flex' }}>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
