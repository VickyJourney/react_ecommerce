import { Add, Delete, Edit, PersonOutline } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductModal from '../components/Modals/ProductModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProductRequest,
  fetchProductsRequest,
} from '../redux/slice/ProductSlice';

const ProductsTable = () => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const handleEdit = (id) => {
    console.log('Edit product:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete product:', id);
  };

  const handleAddProduct = () => {
    setSelectedRowId(null);
    setProductModalOpen(true);
    setSelectedProduct(null);
  };

  const handleSave = (product) => {
    console.log('Save product:', product);
    dispatch(addProductRequest(product));
    setProductModalOpen(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 80, sortable: true },
    { field: 'category', headerName: 'Category', width: 155 },
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'quantity', headerName: 'Quantity', type: 'number', width: 100 },
    { field: 'price', headerName: 'Price (€)', type: 'number', width: 100 },
    {
      field: 'actions',
      headerName: '',
      width: 90,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            size='small'
            color='primary'
            onClick={() => handleEdit(params.row.id)}
          >
            <Edit />
          </IconButton>
          <IconButton
            size='small'
            color='error'
            onClick={() => handleDelete(params.row.id)}
          >
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ bgcolor: '#37b86c', minHeight: '100vh', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Button
          startIcon={<PersonOutline />}
          variant='outlined'
          sx={{
            color: '#37b86c',
            bgcolor: 'white',
            fontWeight: 'bold',
            '&:hover': { bgcolor: '#D9D9D9' },
          }}
          onClick={() => navigate('/productsPreview')}
        >
          Preview
        </Button>
        <Button
          startIcon={<Add />}
          variant='outlined'
          sx={{
            color: '#37b86c',
            bgcolor: 'white',
            fontWeight: 'bold',
            '&:hover': { bgcolor: '#D9D9D9' },
          }}
          onClick={() => handleAddProduct()}
        >
          Add product
        </Button>
      </Box>
      <Typography
        variant='h3'
        sx={{ color: 'white', fontWeight: '700', mb: 3, textAlign: 'center' }}
      >
        Products
      </Typography>
      <Box
        sx={{
          bgcolor: 'white',
          borderRadius: 1,
          '& .MuiDataGrid-row:nth-of-type(odd)': {
            bgcolor: '#f9f9f9',
          },
          '& .MuiDataGrid-row:hover': {
            bgcolor: '#a8d5a8',
            cursor: 'pointer',
          },
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
        }}
      >
        <DataGrid
          autoHeight
          rows={products}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onRowClick={(params) => setSelectedRowId(params.id)}
          getRowClassName={(params) =>
            params.id === selectedRowId ? 'Mui-selected-row' : ''
          }
          sx={{
            '& .Mui-selected-row': {
              bgcolor: '#37b86c',
              color: 'white',
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#4a8b4a' },
            },
          }}
        />
        <ProductModal
          open={isProductModalOpen}
          handleClose={() => setProductModalOpen(false)}
          handleSave={handleSave}
          product={selectedProduct}
          isEdit={!!selectedProduct}
        />
      </Box>
    </Box>
  );
};

export default ProductsTable;
