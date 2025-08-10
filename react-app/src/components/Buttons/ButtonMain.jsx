import { Button, Box } from '@mui/material';
import PropTypes from 'prop-types';

const ButtonMain = ({ icon, text, ...props }) => (
  <Button
    variant='contained'
    {...props}
    sx={{
      padding: '12px',
      backgroundColor: 'white',
      color: '#37b86c',
      width: '170px',
      fontWeight: '700',
      fontSize: '16px',
      textTransform: 'capitalize',
      borderRadius: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1,
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {icon}
      {text}
    </Box>
  </Button>
);

ButtonMain.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string.isRequired,
};

export default ButtonMain;
