import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .test('is-admin', 'Invalid username', (value) => value === 'admin'),
  password: Yup.string()
    .required('Password is required')
    .test('is-password', 'Invalid password', (value) => value === 'password1'),
});
