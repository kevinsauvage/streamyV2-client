/* eslint-disable camelcase */
import { Link } from 'react-router-dom';

import { image } from '../../../helpers/requests';
import CardBtns from '../../CardBtns/CardBtns';

import styles from './AcordeonCard.module.scss';

const AcordeonCard = ({ movie, active, activeLeft, activeRight, type }) => {
  const { name, poster_path, original_title, original_name, media_type, id, overview, title } =
    movie || {};
  return (
    <div
      className={`${styles.card} ${active ? styles.active : ''} ${
        activeLeft ? styles['active-left'] : ''
      } ${activeRight ? styles['active-right'] : ''}`}
    >
      <img
        className={styles.image}
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
      <div className={styles.details}>
        <Link to={`/${type || media_type}/${id}`}>
          <h6 className={styles.title}>{title || original_title || original_name}</h6>
        </Link>
        <p className={styles.overview}>{overview}</p>
        <CardBtns movie={movie} type={type} />
      </div>
    </div>
  );
};

export default AcordeonCard;
