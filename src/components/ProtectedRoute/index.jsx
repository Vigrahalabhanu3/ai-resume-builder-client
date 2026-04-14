import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="page-bg flex-center min-h-screen">
        <div className="flex-col items-center gap-sm">
          <div className="spinner" />
          <p className="text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;

  return children;
}

export default ProtectedRoute;
