import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  category: '',
  name: '',
  quantity: '',
  price: '',
  photo: '',
  description: '',
}

const ProductModal = ({ open, handleClose, handleSave, product, isEdit }) => {

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    setFormData(initialState);
  }, [open]);

  useEffect(() => {
    if (product) {
      setFormData({
        category: product.category || '',
        name: product.name || '',
        quantity: product.quantity || '',
        price: product.price || '',
        photo: product.photo || '',
        description: product.description || '',
      });
    } else {
      setFormData({
        category: '',
        name: '',
        quantity: '',
        price: '',
        photo: '',
        description: '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = () => {
    handleSave({ ...formData, id: product?.id });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      <DialogTitle>{isEdit ? 'Edit product' : 'Add product'}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label='Category'
          name='category'
          value={formData.category}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label='Name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label='Quantity'
          name='quantity'
          type='number'
          value={formData.quantity}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label='Price'
          name='price'
          type='number'
          value={formData.price}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label='Photo URL'
          name='photo'
          value={formData.photo}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label='Description'
          name='description'
          value={formData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='inherit'>
          Cancel
        </Button>
        <Button onClick={onSubmit} variant='contained' color='primary'>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ProductModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  product: PropTypes.object,
  isEdit: PropTypes.bool,
};

export default ProductModal;
