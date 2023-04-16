/* eslint-disable camelcase */
import { Link } from 'react-router-dom';

import extractYearFromDate from '../../helpers/extractYearFromDate';
import { image } from '../../helpers/requests';
import CardBtns from '../CardBtns/CardBtns';
import Container from '../Container/Container';

import './BigMovieCard.scss';

const BigMovieCard = ({ movie, title, animate, type }) => {
  const {
    backdrop_path,
    original_title,
    original_name,
    media_type,
    id,
    release_date,
    first_air_date,
    vote_average,
    overview,
  } = movie || {};

  return (
    <div className={animate ? 'BigMovieCard BigMovieCard--animate' : 'BigMovieCard'}>
      <img
        className="BigMovieCard__img"
        src={`${window.innerWidth < 500 ? image.url.w780 : image.url.w1280}${backdrop_path}`}
        alt={original_title || original_name}
        width="2000"
        height="1125"
        loading="lazy"
      />
      <div className="BigMovieCard__detail">
        <Container>
          <p className="BigMovieCard__title">{title}</p>
          <Link to={`/${type || media_type}/${id}`}>
            <h2 className="BigMovieCard__name">{original_title || original_name}</h2>
          </Link>
          <div className="BigMovieCard__row">
            <p className="BigMovieCard__date">
              {extractYearFromDate(release_date) || extractYearFromDate(first_air_date)}{' '}
            </p>
            <div className="BigMovieCard__note">
              <span>{Math.ceil(vote_average?.toFixed(2))}</span> / 10
            </div>
            <p className="BigMovieCard__type">{media_type === 'tv' ? 'show' : media_type}</p>
          </div>
          <p className="BigMovieCard__overview">{overview}</p>
          <CardBtns movie={movie} type={media_type === 'tv' ? 'show' : media_type} />
        </Container>
      </div>
    </div>
  );
};

export default BigMovieCard;
