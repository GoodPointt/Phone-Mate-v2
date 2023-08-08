import * as Yup from 'yup';

export const CONTACT_VALIDATION = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[a-zA-Z0-9'-\s]+$/,
      'Name may contain only letters, apostrophe, dash and spaces.'
    )
    .required('Name is required'),
  number: Yup.string()
    .matches(
      /^[0-9\s+()-]+$/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Number is required'),
});

export const LOGIN_VALIDATION = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .matches(
      /^[a-zA-Z0-9!@#$%^&*()-_=+`~[\]{}|:<>/?]+$/,
      'Password must contain only Latin letters (both uppercase and lowercase), digits, and other characters.'
    )
    .required('Password is required'),
});

export const REGISTER_VALIDATION = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-Я0-9'-\s]+$/,
      'Name may contain only letters, Cyrillic letters, digits, apostrophe, dash, and spaces.'
    )
    .required('Name is required'),
  email: Yup.string()
    .email('Enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .matches(
      /^[a-zA-Z0-9!@#$%^&*()-_=+`~[\]{}|:<>/?]+$/,
      'The password must contain only Latin letters (both uppercase and lowercase), digits, and other characters.'
    )
    .required('Password is required'),
});
