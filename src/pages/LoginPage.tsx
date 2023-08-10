import { Link } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm/LoginForm';

export const LoginPage = () => {
  return (
    <>
      <LoginForm />
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <Link to="/register" className="underformText">
          Do not have an account?
          <span style={{ textDecorationLine: 'underline', marginLeft: 10 }}>
            Sign up
          </span>
        </Link>
      </div>
    </>
  );
};
