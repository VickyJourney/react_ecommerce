import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import PropTypes from 'prop-types';

const ProductsPreview = ({ products = [] }) => {
  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {products.length > 0 ? (
          products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component='img'
                  height='200'
                  image={product.photo || 'https://via.placeholder.com/300'}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant='h6' gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Price: ${product.price}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Quantity: {product.quantity}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    p: 2,
                    mt: 'auto',
                    bgcolor: 'success.light',
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    variant='body2'
                    sx={{ color: 'white', fontWeight: 'bold' }}
                  >
                    ✅ Ready to send
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography
            sx={{ color: 'white', fontSize: '24px', fontFamily: 'Bold' }}
          >
            No products found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

ProductsPreview.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      photo: PropTypes.string,
    })
  ),
};

export default ProductsPreview;
