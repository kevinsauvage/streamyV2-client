import { getItem } from './sessionStorage';

const apiHelper = async (url, data, method = 'POST') => {
  const bearer = `Bearer ${getItem('user_token_streamy')}`;

  const object = {
    headers: {
      Authorization: bearer,
      'Content-Type': 'application/json',
    },
    method,
    withCredentials: true,
  };

  if (data) object.body = JSON.stringify(data);

  const response = await fetch(encodeURI(url), object);
  return response.json();
};

export default apiHelper;
