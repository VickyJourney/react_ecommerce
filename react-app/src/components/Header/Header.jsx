import { Box } from '@mui/material';
import logoHeader from '../../images/logo-header.svg';

const Header = () => (
  <Box sx={{ padding: '20px 30px 30px' }}>
    <img src={logoHeader} alt='logo rozetka' />
  </Box>
);

export default Header;
