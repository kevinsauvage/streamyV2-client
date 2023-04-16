/* eslint-disable camelcase */
import { useRef } from 'react';
import { Link } from 'react-router-dom';

import extractYearFromDate from '../../helpers/extractYearFromDate';
import { image } from '../../helpers/requests';
import PlaceholderImage from '../../images/placeholder.png';
import CardBtns from '../CardBtns/CardBtns';

import './MovieCard.scss';

const MovieCard = ({ movie, type }) => {
  const card = useRef(null);
  const { original_name, original_title, poster_path } = movie || {};

  return (
    <div className="Movie-card" ref={card}>
      <div className="Movie-card__imgWrapper">
        <div className="Movie-card__imgWrapper-hover">
          <CardBtns movie={movie} type={type} className="Movie-card__imgWrapper-hover__buttons" />
        </div>
        <img
          className="Movie-card__img"
          loading="lazy"
          src={
            poster_path
              ? `${window.innerWidth < 500 ? image.url.w185 : image.url.w342}${poster_path}`
              : PlaceholderImage
          }
          alt={original_title || original_name}
          width="185"
          height="278"
        />
      </div>
      <div className="Movie-card__detail">
        <Link to={`/${type || movie?.media_type}/${movie.id}`}>
          <p className="Movie-card__title">
            {movie?.title || movie?.original_title || movie?.original_name || ''}
          </p>
        </Link>
        <p className="Movie-card__release">
          {extractYearFromDate(movie?.release_date) || extractYearFromDate(movie?.first_air_date)}
        </p>
        <p className="Movie-card__average">
          <span>{movie?.vote_average?.toFixed()}</span> / 10
        </p>
        {(movie?.media_type || type) && (
          <p className="Movie-card__genre">
            {movie?.media_type === 'tv' ? 'show' : type || movie?.media_type}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
