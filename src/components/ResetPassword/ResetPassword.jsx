import { AiOutlineCloseSquare } from 'react-icons/ai';

import { unstopScroll } from '../../helpers/scroll';
import validateEmail from '../../helpers/validateEmail';
import useForm from '../../hooks/useForm';
import Container from '../Container/Container';
import Form from '../Form/Form';
import Input from '../input/Input';

import styles from './ResetPassword.module.scss';

const ResetPassword = ({ setDisplayPassRec }) => {
  const initialState = { email: '' };

  const submitResetPassword = async (formData, setError) => {
    try {
      if (!formData.email) return setError('Missing email.');
      if (!validateEmail(formData.email)) return setError('Invalid email format.');
      // await sendPasswordResetEmail(auth, formData.email);
      setError('Email correctly send.');
      setTimeout(() => setDisplayPassRec(false), 2000);
    } catch (error) {
      if (error.code === 'auth/user-not-found') return setError('User not found.');
      console.error(error);
    }
  };

  const { formData, handleInputChange, handleSubmit, loading, error } = useForm(
    initialState,
    submitResetPassword
  );

  return (
    <div className={styles.container}>
      <Container>
        <div className={styles.close}>
          <AiOutlineCloseSquare
            onClick={() => {
              unstopScroll();
              setDisplayPassRec(false);
            }}
          />
        </div>
        <Form
          title="Forgot Password ?"
          subtitle="You Can Reset Password Using This Form."
          handleSubmit={handleSubmit}
          error={error}
          loading={loading}
          btnText="SEND"
        >
          <Input
            label="Email"
            type="email"
            name="email"
            onChange={handleInputChange}
            value={formData.email}
          />
        </Form>
      </Container>
    </div>
  );
};

export default ResetPassword;
