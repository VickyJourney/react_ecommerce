import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Sorry, something went wrong.</h1>
      <p>
        Please return to the{' '}
        <Link to='/login' style={{ color: '#bde6f7ff', fontWeight: 'bold' }}>
          login page
        </Link>
        .
      </p>
    </div>
  );
};

export default NotFoundPage;
