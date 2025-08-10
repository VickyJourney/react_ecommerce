import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { routes } from './constants/routes.jsx';
import ProtectedRoute from './utils/ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace />} />
        <Route element={<Layout />}>
          {Object.keys(routes).map((key) => {
            const route = routes[key];
            return (
              <Route
                key={route.id}
                path={route.path}
                element={
                  route.protected ? (
                    <ProtectedRoute>{route.element}</ProtectedRoute>
                  ) : (
                    route.element
                  )
                }
              >
              </Route>
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
