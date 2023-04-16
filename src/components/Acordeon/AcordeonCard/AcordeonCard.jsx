import { Link } from 'react-router-dom';

import { image } from '../../../helpers/requests';
import CardBtns from '../../CardBtns/CardBtns';

import './AcordeonCard.scss';

const AcordeonCard = ({ movie, active, activeLeft, activeRight, type }) => (
  <div
    className={`AcordeonCard ${active && 'AcordeonCard__active'} ${
      activeLeft && 'AcordeonCard__active--side AcordeonCard__active--left'
    } ${activeRight && 'AcordeonCard__active--side AcordeonCard__active--right'}`}
  >
    <img
      className="AcordeonCard__img"
      src={
        window.innerWidth < 400
          ? `${image.url.w500}${movie?.poster_path}`
          : `${image.url.w780}${movie?.poster_path}`
      }
      alt={movie?.name || movie?.original_title || movie?.original_name}
      width="500"
      height="750"
      loading="lazy"
    />
    <div className="AcordeonCard__detail">
      <Link to={`/${type || movie?.media_type}/${movie.id}`}>
        <h6 className="AcordeonCard__title">
          {movie?.title || movie?.original_title || movie?.original_name}
        </h6>
      </Link>
      <p className="AcordeonCard__overview">{movie?.overview}</p>
      <CardBtns movie={movie} type={type} />
    </div>
  </div>
);

export default AcordeonCard;
