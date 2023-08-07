import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const HomePage = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>{isLoggedIn ? <Navigate to="/contacts" /> : <Navigate to="/login" />}</>
  );
};
