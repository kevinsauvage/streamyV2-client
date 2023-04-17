/* eslint-disable camelcase */
import { useRef } from 'react';
import { Link } from 'react-router-dom';

import extractYearFromDate from '../../helpers/extractYearFromDate';
import { image } from '../../helpers/requests';
import PlaceholderImage from '../../images/placeholder.png';
import CardBtns from '../CardBtns/CardBtns';

import styles from './MovieCard.module.scss';

const getImageBaseUrl = () => (window.innerWidth < 500 ? image.url.w185 : image.url.w342);

const MovieCard = ({ movie, type }) => {
  const card = useRef(null);
  const { original_name, original_title, poster_path } = movie || {};

  return (
    <div className={styles.card} ref={card}>
      <div className={styles['image-container']}>
        <div className={styles.hover}>
          <CardBtns movie={movie} type={type} className={styles['hover-buttons']} />
        </div>
        <img
          className={styles.image}
          loading="lazy"
          src={poster_path ? `${getImageBaseUrl()}${poster_path}` : PlaceholderImage}
          alt={original_title || original_name}
          width="185"
          height="278"
        />
      </div>
      <div className={styles.details}>
        <Link to={`/${type || movie?.media_type}/${movie.id}`}>
          <p className={styles.title}>
            {movie?.title || movie?.original_title || movie?.original_name || ''}
          </p>
        </Link>
        <p className={styles.release}>
          {extractYearFromDate(movie?.release_date) || extractYearFromDate(movie?.first_air_date)}
        </p>
        <p className={styles.average}>
          <span>{movie?.vote_average?.toFixed()}</span> / 10
        </p>
        {(movie?.media_type || type) && (
          <p className={styles.genre}>
            {movie?.media_type === 'tv' ? 'show' : type || movie?.media_type}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
