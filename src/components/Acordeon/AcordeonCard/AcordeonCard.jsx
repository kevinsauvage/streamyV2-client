/* eslint-disable camelcase */
import { Link } from 'react-router-dom';

import { image } from '../../../helpers/requests';
import CardBtns from '../../CardBtns/CardBtns';

import './AcordeonCard.scss';

const AcordeonCard = ({ movie, active, activeLeft, activeRight, type }) => {
  const { name, poster_path, original_title, original_name, media_type, id, overview, title } =
    movie || {};
  return (
    <div
      className={`AcordeonCard ${active && 'AcordeonCard__active'} ${
        activeLeft && 'AcordeonCard__active--side AcordeonCard__active--left'
      } ${activeRight && 'AcordeonCard__active--side AcordeonCard__active--right'}`}
    >
      <img
        className="AcordeonCard__img"
        src={
          window.innerWidth < 400
            ? `${image.url.w500}${poster_path}`
            : `${image.url.w780}${poster_path}`
        }
        alt={name || original_title || original_name}
        width="500"
        height="750"
        loading="lazy"
      />
      <div className="AcordeonCard__detail">
        <Link to={`/${type || media_type}/${id}`}>
          <h6 className="AcordeonCard__title">{title || original_title || original_name}</h6>
        </Link>
        <p className="AcordeonCard__overview">{overview}</p>
        <CardBtns movie={movie} type={type} />
      </div>
    </div>
  );
};

export default AcordeonCard;
