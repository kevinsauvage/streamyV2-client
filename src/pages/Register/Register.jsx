import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Container from '../../components/Container/Container';
import Form from '../../components/Form/Form';
import FormRow from '../../components/formRow/FormRow';
import Input from '../../components/input/Input';
import { AuthContext } from '../../context/AuthContext';
import validateEmail from '../../helpers/validateEmail';
import useForm from '../../hooks/useForm';
import Page from '../../layouts/Page/Page';

import './Register.scss';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const initialState = {
    email: '',
    firstName: '',
    lastname: '',
    password: '',
  };

  const submitCallback = async (formData) => {
    try {
      const { firstName, lastName, email, password } = formData;

      if (!lastName || !firstName || !email || !password) return toast.warn('Missing field.');

      if (password.length < 8) return toast.warn('Password must be at least 8 charactere long.');

      if (!validateEmail(email)) return toast.warn('Invalid Email');

      const { success, error } = (await register(firstName, lastName, email, password)) || {};

      if (success) return navigate('/login');

      if (error?.keyPattern?.email) return toast.error('Email already registered.');
      return toast.error('ESomething went wrong please try again.');
    } catch (error) {
      console.error(error);
      toast.error('ESomething went wrong please try again.');
    }
  };

  const { formData, handleInputChange, handleSubmit, loading } = useForm(
    initialState,
    submitCallback
  );

  return (
    <Page className="Register">
      <Container>
        <Form
          title="Create an Account"
          subtitle="No credit card required."
          handleSubmit={handleSubmit}
          loading={loading}
          btnText="SIGNUP"
        >
          <FormRow>
            <Input
              label="First name"
              type="text"
              name="firstName"
              onChange={handleInputChange}
              value={formData.firstName}
            />
            <Input
              label="Last name"
              type="text"
              name="lastName"
              onChange={handleInputChange}
              value={formData.lastName}
            />
          </FormRow>
          <FormRow>
            <Input
              label="Email"
              type="email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </FormRow>
        </Form>
        <p className="Register__alreadyMember">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </Container>
    </Page>
  );
};

export default Register;
