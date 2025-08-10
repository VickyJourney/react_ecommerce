import Login from '../pages/Login.jsx';
import ProductsTable from '../pages/ProductsTable.jsx';
import ProductsPreview from '../pages/ProductsPreview.jsx';
import NotFound from '../pages/NotFound.jsx';

export const routes = {
  login: {
    element: <Login />,
    path: '/login',
    id: 1,
    protected: false,
  },
  productsTable: {
    element: <ProductsTable />,
    path: '/productsTable',
    id: 2,
    protected: true,
  },
  productsPreview: {
    element: <ProductsPreview />,
    path: '/productsPreview',
    id: 3,
    protected: true,
  },
  notFound: {
    element: <NotFound />,
    path: '*',
    id: 4,
    protected: false,
  },
};
