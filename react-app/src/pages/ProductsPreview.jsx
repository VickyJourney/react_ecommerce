import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const ProductsPreview = () => {
  const { products } = useSelector((state) => state.products);

  const navigate = useNavigate();

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  useEffect(() => {
    if (!products || products.length === 0) {
      navigate('/productsTable');
    }
  }, [products, navigate]);

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {products && products.length > 0 ? (
          products.map((product, index) => (
            <Grid item xs={12} sm={3} key={index}>
              <Card
                sx={{
                  width: '250px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component='img'
                  height='200'
                  maxWidth='250px'
                  image={
                    isValidUrl(product.photo)
                      ? product.photo
                      : './src/images/no_photo.jpg'
                  }
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant='h6' component='h5' gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography
                    variant='body2'
                    component='span'
                    color='#FC5B00'
                    fontSize='16px'
                    fontWeight='700'
                    mr='30px'
                  >
                    Price: ${product.price}
                  </Typography>
                  <Typography
                    variant='body2'
                    component='span'
                    color='black'
                    fontSize='16px'
                  >
                    Quantity: {product.quantity}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    p: 2,
                    mt: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '5px',
                  }}
                >
                  <ShoppingCartOutlinedIcon sx={{ fill: '#37b86c' }} />
                  <Typography
                    variant='body2'
                    sx={{ color: '#37b86c', fontWeight: 'bold' }}
                  >
                    Ready to send
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
