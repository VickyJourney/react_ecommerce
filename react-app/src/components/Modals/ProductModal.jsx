import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const ProductSchema = Yup.object().shape({
  category: Yup.string().required('Category is required'),
  name: Yup.string().required('Name is required'),
  quantity: Yup.number()
    .typeError('Quantity must be a number')
    .required('Quantity is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .required('Price is required'),
  photo: Yup.string().url('Photo must be a valid URL').nullable(),
});

const ProductModal = ({ open, handleClose, handleSave, product, isEdit }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      <DialogTitle>{isEdit ? 'Edit Product' : 'Add Product'}</DialogTitle>

      <Formik
        initialValues={{
          id: product?.id || '',
          category: product?.category || '',
          name: product?.name || '',
          quantity: product?.quantity || '',
          price: product?.price || '',
          photo: product?.photo || '',
        }}
        validationSchema={ProductSchema}
        onSubmit={(values) => {
          handleSave(values);
        }}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form>
            <DialogContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                pt: 1,
              }}
            >
              <TextField
                label='Category'
                name='category'
                value={values.category}
                onChange={handleChange}
                error={touched.category && Boolean(errors.category)}
                helperText={touched.category && errors.category}
                fullWidth
              />
              <TextField
                label='Name'
                name='name'
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                fullWidth
              />
              <TextField
                label='Quantity'
                name='quantity'
                value={values.quantity}
                onChange={handleChange}
                error={touched.quantity && Boolean(errors.quantity)}
                helperText={touched.quantity && errors.quantity}
                fullWidth
              />
              <TextField
                label='Price (€)'
                name='price'
                value={values.price}
                onChange={handleChange}
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
                fullWidth
              />
              <TextField
                label='Photo URL'
                name='photo'
                value={values.photo}
                onChange={handleChange}
                error={touched.photo && Boolean(errors.photo)}
                helperText={touched.photo && errors.photo}
                fullWidth
              />
            </DialogContent>

            <DialogActions sx={{ pr: 3, pb: 2 }}>
              <Button
                onClick={handleClose}
                sx={{
                  background: '#726969',
                  color: 'white',
                  fontWeight: '700',
                }}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                variant='contained'
                sx={{ color: 'white', fontWeight: '700' }}
              >
                {isEdit ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ProductModal;
