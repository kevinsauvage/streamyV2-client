/* eslint-disable camelcase */
import { useContext } from 'react';
import { BsPlayFill } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';
import { MdRemoveCircleOutline } from 'react-icons/md';

import { UserContext } from '../../context/UserContext';
import extractYearFromDate from '../../helpers/extractYearFromDate';
import { image } from '../../helpers/requests';
import PlaceholderImage from '../../images/placeholder.png';
import CreditBox from '../CreditBox/CreditBox';

import styles from './PlayDetails.module.scss';

const PlayDetails = ({ movie, playTrailer, type }) => {
  const { addToMovieList, removeFromMovieList, userMovies } = useContext(UserContext);
  const {
    original_name,
    poster_path,
    original_title,
    name,
    tagline,
    release_date,
    first_air_date,
    vote_average,
    media_type,
    genres,
    credits,
    overview,
    id,
  } = movie;

  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={poster_path ? `${image.url.w500}${poster_path}` : PlaceholderImage}
        alt={original_title || original_name}
        width="185"
        height="278"
      />

      <div className={styles.details}>
        <div>
          <h6 className={styles.title}>{name || original_title || original_name}</h6>
          <p className={styles.tagline}>
            <i>{tagline}</i>
          </p>
          <div className={styles.row}>
            <p className={styles.release}>
              {extractYearFromDate(release_date) || extractYearFromDate(first_air_date)}
            </p>
            <p className={styles.average}>
              <span>{Math.ceil(vote_average.toFixed(2))}</span> / 10
            </p>
            {(media_type || type) && (
              <p className={styles.type}>{media_type === 'tv' ? 'show' : type || media_type}</p>
            )}
          </div>
          <div className={styles.genres}>
            {genres?.map((item) => (
              <p key={item.name} className={styles.genre}>
                {item.name}
              </p>
            ))}
          </div>
          <p className={styles.overview}>{overview}</p>
          <CreditBox credits={credits} />
        </div>

        <div className={styles.buttons}>
          <button type="button" className={styles.button} onClick={playTrailer}>
            <BsPlayFill /> Play Trailer
          </button>

          {userMovies && movie && userMovies.map((item) => item.id).includes(id) ? (
            <button
              type="button"
              className={styles.button}
              onClick={() => removeFromMovieList(movie)}
            >
              <MdRemoveCircleOutline />
              watch list
            </button>
          ) : (
            <button
              type="button"
              className={styles.button}
              onClick={() => addToMovieList(movie, type)}
            >
              <IoMdAdd />
              watch List
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayDetails;
