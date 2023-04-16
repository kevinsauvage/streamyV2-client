import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import apiRoutes from '../data/apiRoutes';
import apiHelper from '../helpers/apiHelper';
import { getItem, setItem } from '../helpers/sessionStorage';

const getUserById = async (id) => apiHelper(`${apiRoutes.users}/${id}`, undefined, 'GET');

export const UserContext = createContext();

const { Provider } = UserContext;

export const UserProvider = ({ children }) => {
  const [userMovies, setUserMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const getUserMovies = useCallback(() => {
    const user = getItem('user');
    const savedMovies = user?.savedMovies;
    if (savedMovies) setUserMovies(savedMovies);
  }, []);

  const update = useCallback(async (firstName, lastName, email, savedMovies, id) => {
    const response = await apiHelper(
      `${apiRoutes.users}/${id}`,
      { email, firstName, lastName, savedMovies },
      'PUT'
    );
    if (response?.user) setItem('user', response.user);
    return response;
  }, []);

  const addToMovieList = useCallback(
    async (movie, type) => {
      const user = getItem('user');
      if (!user) return navigate('/login', { state: { movie, path: location.pathname, type } });
      const savedMovies = user?.savedMovies;
      const isSaved = savedMovies.find((item) => item.movie.id === movie.id);
      if (isSaved) {
        return toast.error(`${movie.title || movie.name} is already saved to your watch list`);
      }
      const newMovies = [...userMovies, { movie, type }];
      const { success } = (await update(undefined, undefined, undefined, newMovies, user.id)) || {};
      if (success) {
        getUserMovies();
        return toast.success(
          `${movie.title || movie.name} as correctly been added to your watch list`
        );
      }
    },
    [getUserMovies, location.pathname, navigate, update, userMovies]
  );

  const removeFromMovieList = useCallback(
    async (movie) => {
      const user = getItem('user');
      const savedMovies = user?.savedMovies;
      const filtered = savedMovies.filter((item) => item.movie.id !== movie.id);
      const { success } = await update(undefined, undefined, undefined, filtered, user.id);
      if (success) {
        getUserMovies();
        return toast.success(
          `${movie.title || movie.name} as correctly been deleted from your watch list`
        );
      }
    },
    [getUserMovies, update]
  );

  const handleLogOut = useCallback(() => {
    window.sessionStorage.removeItem('user_token_streamy');
    window.sessionStorage.removeItem('user');
    setUserMovies([]);
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    getUserMovies();
  }, [getUserMovies]);

  const value = useMemo(
    () => ({
      addToMovieList,
      getUserById,
      getUserMovies,
      handleLogOut,
      removeFromMovieList,
      update,
      userMovies,
    }),
    [addToMovieList, getUserMovies, handleLogOut, removeFromMovieList, update, userMovies]
  );

  return <Provider value={value}>{children}</Provider>;
};
