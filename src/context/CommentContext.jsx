import { createContext, useCallback } from 'react';

import apiRoutes from '../data/apiRoutes';
import apiHelper from '../helpers/apiHelper';

export const commentContext = createContext();

const { Provider } = commentContext;

export const CommentProvider = ({ children }) => {
  const createComment = useCallback(
    async (comment, movieId) => apiHelper(apiRoutes.comment, { content: comment, movieId }, 'POST'),
    []
  );

  const getCommentsByMovieId = useCallback(
    async (movieId, page) =>
      apiHelper(`${apiRoutes.comment}/${movieId}?p=${page}`, undefined, 'GET'),
    []
  );

  const value = { createComment, getCommentsByMovieId };

  return <Provider value={value}>{children}</Provider>;
};
