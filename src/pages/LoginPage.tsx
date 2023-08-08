import { logIn } from '../redux/auth/operations';
import { ErrorMessage, Form, Formik } from 'formik';
import { LOGIN_VALIDATION } from '../common/formik';
import {
  ErrorMsg,
  StyledFormInput,
} from '../components/ContactForm/ContactForm.styled';
import { useAppDispatch } from '../hooks/hooks';
import { IUser } from '../common/models';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  const INITIAL_VALUES: IUser = { email: '', password: '' };

  const dispatch = useAppDispatch();

  const handleSubmit = (
    values: IUser,
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!values.email) {
      toast.warning('Please enter an email.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(values.email)) {
      toast.warning('Please enter a valid email address.');
      return;
    }

    if (!values.password || values.password.length < 6) {
      toast.warning('Password must be at least 6 characters long.');
      return;
    }

    dispatch(logIn(values));
    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={LOGIN_VALIDATION}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="user-box">
            <StyledFormInput type="email" name="email" />
            <label className="submit__lable">E-mail</label>
            <ErrorMessage name="email" component={ErrorMsg} />
          </div>

          <div className="user-box">
            <StyledFormInput
              type="password"
              name="password"
              autocomplite="current-password"
            />
            <ErrorMessage name="password" component={ErrorMsg} />
            <label className="submit__lable">Password</label>
          </div>

          <center>
            <button className="submit-btn" type="submit">
              Log in<span></span>
            </button>
          </center>
        </Form>
      </Formik>
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <Link to="/register" className="underformText">
          Do not have an account?
          <span style={{ textDecorationLine: 'underline', marginLeft: 10 }}>
            Register now
          </span>
        </Link>
      </div>
    </>
  );
};
