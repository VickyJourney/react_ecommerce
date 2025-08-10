import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import PropTypes from 'prop-types';

const ConfirmDelete = ({ open, handleClose, handleConfirm, product }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {product
          ? `Are you sure you want to delete "${product.name}"?`
          : 'Delete this item?'}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            handleConfirm();
            handleClose();
          }}
          variant='contained'
          color='error'
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDelete.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  product: PropTypes.object,
};

export default ConfirmDelete;
