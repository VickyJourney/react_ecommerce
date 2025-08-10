import { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

const headCells = [
  { id: 'id', label: 'ID', numeric: true },
  { id: 'category', label: 'Category', numeric: false },
  { id: 'name', label: 'Name', numeric: false },
  { id: 'quantity', label: 'Quantity', numeric: true },
  { id: 'price', label: 'Price (₴)', numeric: true },
  { id: 'actions', label: '', numeric: false },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const TableMain = ({ rows, onEdit, onDelete }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  '& td, & th': {
                    textAlign: 'center',
                    backgroundColor: '#0EC86F',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                  },
                }}
              >
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    sx={{ fontWeight: 'bold', color: 'white' }}
                  >
                    {headCell.id !== 'actions' ? (
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={(e) => handleRequestSort(e, headCell.id)}
                        sx={{
                          color: '#726969',
                          '&.Mui-active': { color: '#726969' },
                        }}
                      >
                        {headCell.label}
                      </TableSortLabel>
                    ) : (
                      headCell.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice()
                .sort(getComparator(order, orderBy))
                .map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      height: '32px',
                      '& td, & th': {
                        paddingTop: '8px',
                        paddingBottom: '8px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                      },
                      backgroundColor: index % 2 === 1 ? '#3CD78C' : '#D9D9D9',
                    }}
                  >
                    <TableCell
                      sx={{
                        width: '60px',
                        color: index % 2 === 1 ? '#A58F8F' : 'white',
                      }}
                    >
                      {row.id}
                    </TableCell>
                    <TableCell
                      sx={{ color: index % 2 === 1 ? '#A58F8F' : 'white' }}
                    >
                      {row.category}
                    </TableCell>
                    <TableCell
                      sx={{ color: index % 2 === 1 ? '#A58F8F' : 'white' }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      sx={{ color: index % 2 === 1 ? '#A58F8F' : 'white' }}
                    >
                      {row.quantity}
                    </TableCell>
                    <TableCell
                      sx={{ color: index % 2 === 1 ? '#A58F8F' : 'white' }}
                    >
                      {row.price.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => onEdit(row)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => onDelete(row)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

TableMain.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default TableMain;
