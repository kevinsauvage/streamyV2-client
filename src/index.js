import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { CommentProvider } from './context/CommentContext';
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
          <CommentProvider>
            <App />
          </CommentProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
