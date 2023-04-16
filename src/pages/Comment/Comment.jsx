import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import CommentBox from '../../components/Comment/CommentBox';
import Title from '../../components/Title/Title';
import { commentContext } from '../../context/CommentContext';
import apiHelper from '../../helpers/apiHelper';
import requests, { image } from '../../helpers/requests';
import Page from '../../layouts/Page/Page';

import './Comment.scss';

const Comment = () => {
  const { id, type } = useParams();
  const [movie, setMovie] = useState();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const { createComment, getCommentsByMovieId } = useContext(commentContext);

  const getComments = useCallback(async () => {
    const { success, data } = (await getCommentsByMovieId(id, page)) || {};
    if (success) {
      setComments(data.comments);
      setCount(data.count);
    }
  }, [id, getCommentsByMovieId, page]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  useEffect(() => {
    if (!type || !id) return;

    const typeUrls = {
      movie: requests.getMovieById.url.replace('{id}', id),
      show: requests.getShowById.url.replace('{id}', id),
      tv: requests.getShowById.url.replace('{id}', id),
    };
    const url = typeUrls[type];

    // TODO: handle error
    if (!url) return;

    apiHelper(typeUrls[type], undefined, 'get').then((data) => {
      if (data?.id) setMovie(data);
    });
  }, [id, type]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (comment.length === 0) return;

    const { success } = (await createComment(comment, id)) || {};

    if (success) {
      setComment('');
      getComments();

      return toast.success(`The comment was correctly added`);
    }
    return toast.error(`Oops, something went wrong. Please, try again.`);
  };

  const handleUpdate = (newPage) => {
    if (newPage < 0 || newPage >= count / 5) return;
    setPage(newPage);
  };

  return (
    <div className="Comment">
      <Page>
        <div
          className="Comment__banner"
          style={{
            backgroundImage: `url(${image.url.w1280}${movie?.backdrop_path})`,
          }}
        >
          <form className="Comment__form" onSubmit={handleSubmit}>
            <Title title="Add your comment" />
            <textarea
              className="Comment__textArea"
              onChange={({ target }) => setComment(target.value)}
              value={comment}
            />
            <button className="Comment__form-btn" type="submit">
              Post
            </button>
          </form>
        </div>
        <div className="Comment__list">
          <div className="Comment__list-container">
            <Title title="Last comments" />

            {comments.length > 0 ? (
              comments.map((com) => <CommentBox comment={com} key={com._id} />)
            ) : (
              <p>Nothing has been added yet.</p>
            )}
          </div>
        </div>
        {comments.length > 0 && (
          <div className="Comment__pagination">
            <button
              type="button"
              className="Comment__pagination-btn"
              onClick={() => handleUpdate(page - 1)}
            >
              prev
            </button>

            {[...new Array(Math.ceil(count / 5)).keys()].map((item) => {
              if (item !== 0 && page - 2 > item) return <p>.</p>;

              if (item !== Math.ceil(count / 5) - 1 && page + 2 < item) return <p>.</p>;

              return (
                <button
                  key={item}
                  type="button"
                  className={`Comment__pagination-num ${
                    item === page ? 'Comment__pagination-num--active' : ''
                  }`}
                  onClick={() => setPage(item)}
                >
                  {item}
                </button>
              );
            })}
            <button
              type="button"
              className="Comment__pagination-btn"
              onClick={() => handleUpdate(page + 1)}
            >
              next
            </button>
          </div>
        )}
      </Page>
    </div>
  );
};

export default Comment;
