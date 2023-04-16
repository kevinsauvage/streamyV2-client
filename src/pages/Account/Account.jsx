import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Container from '../../components/Container/Container';
import Form from '../../components/Form/Form';
import Input from '../../components/input/Input';
import { UserContext } from '../../context/UserContext';
import { getItem } from '../../helpers/sessionStorage';
import useForm from '../../hooks/useForm';
import Page from '../../layouts/Page/Page';

const Account = () => {
  const [user, setUser] = useState(getItem('user'));

  const { update } = useContext(UserContext);

  const [initialState] = useState({
    email: '',
    firstName: '',
    lastName: '',
    userName: '',
  });

  const submitCallback = async (formData) => {
    try {
      const { email, firstName, lastName } = formData;
      if (!email || !firstName || !lastName) return toast.error('Missing field.');
      const response = await update(firstName, lastName, email, user.savedMovies, user.id);

      if (response.success) {
        setUser(response.user);
        toast.success('Account info updated successfully');
        return;
      }
      toast.error('Something went wrong please try again');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong please try again');
    }
  };

  const { formData, handleInputChange, handleSubmit, loading, setFormData } = useForm(
    initialState,
    submitCallback
  );

  useEffect(() => {
    if (!user) return;
    const { email, firstName, lastName } = user;
    setFormData({ email, firstName, lastName });
  }, [user, setFormData]);

  return (
    <Page className="Account">
      <Container>
        <Form
          handleSubmit={handleSubmit}
          loading={loading}
          btnText="SAVE"
          className="Account__form"
          title="Account Informations"
        >
          <Input
            label="Email"
            type="email"
            name="email"
            onChange={handleInputChange}
            value={formData?.email}
          />
          <Input
            label="First name"
            type="text"
            name="firstName"
            onChange={handleInputChange}
            value={formData?.firstName}
          />
          <Input
            label="Last name"
            type="email"
            name="lastName"
            onChange={handleInputChange}
            value={formData?.lastName}
          />
        </Form>
      </Container>
    </Page>
  );
};

export default Account;
