import { register } from '../redux/auth/operations';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../hooks/hooks';
import { IUser } from '../common/models';
import { ErrorMessage, Form, Formik } from 'formik';
import {
  ErrorMsg,
  StyledFormInput,
} from '../components/ContactForm/ContactForm.styled';
import { REGISTER_VALIDATION } from '../common/formik';

export const RegisterPage = () => {
  const dispatch = useAppDispatch();

  const INITIAL_VALUES: IUser = {
    name: '',
    email: '',
    password: '',
  };

  const handleSubmit = (
    values: IUser,
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!values.name) {
      toast.warning('Please enter a username.');
      return;
    }

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

    dispatch(register(values));
    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={REGISTER_VALIDATION}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="user-box">
            <StyledFormInput type="name" name="name" />
            <label className="submit__lable">Username</label>
            <ErrorMessage name="name" component={ErrorMsg} />
          </div>

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
              Sign in<span></span>
            </button>
          </center>
        </Form>
      </Formik>
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
