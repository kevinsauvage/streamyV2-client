/* eslint-disable camelcase */
import { useContext } from 'react';
import { BsPlayFill } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';
import { MdRemoveCircleOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';

import styles from './CardBtns.module.scss';

const CardBtns = ({ movie, type, className = '' }) => {
  const { addToMovieList, removeFromMovieList, userMovies } = useContext(UserContext);
  const { media_type, id } = movie || {};

  return (
    <div className={`${styles.buttons} ${className}`}>
      <Link className={styles.button} to={`/${type || media_type}/${movie?.id}`}>
        <BsPlayFill /> See details
      </Link>
      {userMovies && movie && userMovies.map((item) => item.movie?.id).includes(id) ? (
        <button type="button" className={styles.button} onClick={() => removeFromMovieList(movie)}>
          <MdRemoveCircleOutline />
          watch list
        </button>
      ) : (
        <button type="button" className={styles.button} onClick={() => addToMovieList(movie, type)}>
          <IoMdAdd />
          Watch List
        </button>
      )}
    </div>
  );
};

export default CardBtns;
