import { Add, Delete, Edit, PersonOutline } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductModal from '../components/Modals/ProductModal';
import ConfirmDelete from '../components/Modals/ConfirmDelete';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProductRequest,
  deleteProductRequest,
  fetchProductsRequest,
  updateProductRequest,
} from '../redux/slice/ProductSlice';

const ProductsTable = () => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const handleEdit = (id) => {
    const productToEdit = products.find((p) => p.id === id);
    if (productToEdit) {
      setSelectedProduct(productToEdit);
      setProductModalOpen(true);
    }
  };

  const handleSave = (product) => {
    if (product.id) {
      dispatch(updateProductRequest(product));
    } else {
      dispatch(addProductRequest(product));
    }
    setProductModalOpen(false);
  };

  const handleDelete = (id) => {
    const productToDelete = products.find((p) => p.id === id);
    if (productToDelete) {
      setSelectedProduct(productToDelete);
      setConfirmDeleteOpen(true);
    }
  };

  const handleDeleteProduct = (id) => {
    if (id) {
      dispatch(deleteProductRequest(id));
    }
    setConfirmDeleteOpen(false);
  };

  const handleAddProduct = () => {
    setSelectedRowId(null);
    setProductModalOpen(true);
    setSelectedProduct(null);
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
            color='black'
            onClick={() => handleEdit(params.row.id)}
          >
            <Edit />
          </IconButton>
          <IconButton
            size='small'
            color='black'
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
          startIcon={<PersonOutline sx={{ color: 'black' }} />}
          variant='outlined'
          sx={{
            color: '#37b86c',
            bgcolor: 'white',
            fontWeight: 'bold',
            width: '180px',
            '&:hover': { bgcolor: '#D9D9D9' },
          }}
          onClick={() => navigate('/productsPreview')}
        >
          Preview
        </Button>
        <Button
          startIcon={<Add sx={{ color: 'black' }} />}
          variant='outlined'
          sx={{
            color: '#37b86c',
            bgcolor: 'white',
            fontWeight: 'bold',
            width: '180px',
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
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#0EC86F',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
              color: '#726969',
            },
            '& .MuiDataGrid-row:nth-of-type(even)': {
              backgroundColor: '#79f0b6ff',
            },
            '& .MuiDataGrid-row:hover': {
              cursor: 'pointer',
            },
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
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
        <ConfirmDelete
          open={isConfirmDeleteOpen}
          handleClose={() => setConfirmDeleteOpen(false)}
          handleConfirm={() => handleDeleteProduct(selectedProduct.id)}
          product={selectedProduct}
        />
      </Box>
    </Box>
  );
};

export default ProductsTable;
