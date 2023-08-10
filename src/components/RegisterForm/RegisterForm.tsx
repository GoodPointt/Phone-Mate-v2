import { toast } from 'react-toastify';
import { IUser } from '../../common/models';
import { useAppDispatch } from '../../hooks/hooks';
import { register } from '../../redux/auth/operations';
import { ErrorMessage, Form, Formik } from 'formik';
import { ErrorMsg, StyledFormInput } from '../ContactForm/ContactForm.styled';
import { REGISTER_VALIDATION } from '../../common/formik';
import { useState } from 'react';
import { ShowPassToggler } from '../ShowPassToggler/ShowPassToggler';

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handlePassShow = () => setShowPassword(!showPassword);

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
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={REGISTER_VALIDATION}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="user-box">
          <StyledFormInput type="name" name="name" autoComplete="username" />
          <label className="submit__lable">Username</label>
          <ErrorMessage name="name" component={ErrorMsg} />
        </div>

        <div className="user-box">
          <StyledFormInput type="email" name="email" autoComplete="email" />
          <label className="submit__lable">E-mail</label>
          <ErrorMessage name="email" component={ErrorMsg} />
        </div>

        <div className="user-box">
          <StyledFormInput
            type={showPassword ? 'text' : 'password'}
            name="password"
            autoComplete="new-password"
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
            Sign up<span></span>
          </button>
        </center>
      </Form>
    </Formik>
  );
};
