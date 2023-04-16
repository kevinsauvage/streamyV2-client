import { createContext, useCallback } from 'react';

import apiRoutes from '../data/apiRoutes';
import apiHelper from '../helpers/apiHelper';

export const AuthContext = createContext();

const { Provider } = AuthContext;

export const AuthProvider = ({ children }) => {
  const login = useCallback(
    async (email, password) => apiHelper(`${apiRoutes.auth}/login`, { email, password }),
    []
  );

  const register = useCallback(
    async (firstName, lastName, email, password) =>
      apiHelper(`${apiRoutes.auth}/register`, { email, firstName, lastName, password }),
    []
  );

  const value = { login, register };

  return <Provider value={value}>{children}</Provider>;
};
