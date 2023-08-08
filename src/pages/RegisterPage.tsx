import { Link } from 'react-router-dom';
import { RegisterForm } from '../components/RegisterForm/RegisterForm';

export const RegisterPage = () => {
  return (
    <>
      <RegisterForm />
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <Link to="/login" className="underformText">
          Already have an account?
          <span style={{ textDecorationLine: 'underline', marginLeft: 10 }}>
            Log in
          </span>
        </Link>
      </div>
    </>
  );
};
