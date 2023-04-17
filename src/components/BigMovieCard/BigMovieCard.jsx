/* eslint-disable camelcase */
import { Link } from 'react-router-dom';

import extractYearFromDate from '../../helpers/extractYearFromDate';
import { image } from '../../helpers/requests';
import CardBtns from '../CardBtns/CardBtns';
import Container from '../Container/Container';

import styles from './BigMovieCard.module.scss';

const BigMovieCard = ({ movie, title, type }) => {
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
    <div
      className={styles.card}
      style={{
        backgroundImage: `url('${
          window.innerWidth < 500 ? image.url.w780 : image.url.w1280
        }${backdrop_path}')`,
      }}
    >
      <Container>
        <div className={styles.details}>
          <p className={styles.title}>{title}</p>
          <Link to={`/${type || media_type}/${id}`}>
            <h2 className={styles.name}>{original_title || original_name}</h2>
          </Link>
          <div className={styles.row}>
            <p className={styles.date}>
              {extractYearFromDate(release_date) || extractYearFromDate(first_air_date)}{' '}
            </p>
            <div className={styles.note}>
              <span>{Math.ceil(vote_average?.toFixed(2))}</span> / 10
            </div>
            <p className={styles.type}>{media_type === 'tv' ? 'show' : media_type}</p>
          </div>
          <p className={styles.overview}>{overview}</p>
          <CardBtns movie={movie} type={media_type === 'tv' ? 'show' : media_type} />
        </div>
      </Container>
    </div>
  );
};

export default BigMovieCard;
