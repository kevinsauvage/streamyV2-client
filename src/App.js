import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './components/Header/Header';
import PageLoader from './components/PageLoader/PageLoader';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import 'react-toastify/dist/ReactToastify.css';

const Shows = lazy(() => import('./pages/Shows/Shows'));
const Play = lazy(() => import('./pages/Play/Play'));
const Movies = lazy(() => import('./pages/Movies/Movies'));
const Home = lazy(() => import('./pages/Home/Home'));
const Filter = lazy(() => import('./pages/Filter/Filter'));
const Search = lazy(() => import('./pages/Search/Search'));
const Register = lazy(() => import('./pages/Register/Register'));
const Login = lazy(() => import('./pages/Login/Login'));
const List = lazy(() => import('./pages/List/List'));
const Account = lazy(() => import('./pages/Account/Account'));

const App = () => (
  <div>
    <Header />
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/show" element={<Shows />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:type/:id" element={<Play />} />
        <Route path="/account" element={<PrivateRoute />}>
          <Route path="/account" element={<Account />} />
        </Route>
        <Route path="/list" element={<PrivateRoute />}>
          <Route path="/list" element={<List />} />
        </Route>
      </Routes>
    </Suspense>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      progress={undefined}
      theme="dark"
    />
  </div>
);

export default App;
