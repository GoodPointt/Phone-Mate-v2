import { toast } from 'react-toastify';
import { IUser } from '../../common/models';
import { useAppDispatch } from '../../hooks/hooks';
import { logIn } from '../../redux/auth/operations';
import { ErrorMessage, Form, Formik } from 'formik';
import { ErrorMsg, StyledFormInput } from '../ContactForm/ContactForm.styled';
import { LOGIN_VALIDATION } from '../../common/formik';
import { useState } from 'react';
import { ShowPassToggler } from '../ShowPassToggler/ShowPassToggler';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const INITIAL_VALUES: IUser = { email: '', password: '' };
  const dispatch = useAppDispatch();

  const handlePassShow = () => setShowPassword(!showPassword);

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
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={LOGIN_VALIDATION}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="user-box">
          <StyledFormInput type="email" name="email" autoComplete="email" />
          <label className="submit__lable">E-mail</label>
          <ErrorMessage name="email" component={ErrorMsg} />
        </div>

        <div className="user-box">
          <StyledFormInput
            type={showPassword ? 'text' : 'password'}
            name="password"
            autoComplete="current-password"
          />
          <ErrorMessage name="password" component={ErrorMsg} />
          <label className="submit__lable">Password</label>

          <ShowPassToggler
            showPassword={showPassword}
            handlePassShow={handlePassShow}
          />
        </div>

        <center>
          <button className="submit-btn" type="submit">
            Log in<span></span>
          </button>
        </center>
      </Form>
    </Formik>
  );
};
