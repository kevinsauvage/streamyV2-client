import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import App from './App';

import './index.scss';

const container = document.querySelector('#app');
const root = createRoot(container);

root.render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
