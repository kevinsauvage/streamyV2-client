import { useCallback, useState } from 'react';

const useForm = (initialState, onSubmit) => {
  const [formData, setFormData] = useState(initialState || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = ({ target }) => {
    setError('');
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await onSubmit?.(formData, setError);
    setLoading(false);
  };

  const handleReset = useCallback(() => setFormData(initialState), [initialState]);

  return {
    error,
    formData,
    handleInputChange,
    handleReset,
    handleSubmit,
    loading,
    setError,
    setFormData,
  };
};

export default useForm;
