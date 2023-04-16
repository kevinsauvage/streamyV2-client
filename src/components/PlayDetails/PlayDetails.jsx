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

import './PlayDetails.scss';

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
    <div className="play-details">
      <img
        className="play-details__image"
        src={poster_path ? `${image.url.w500}${poster_path}` : PlaceholderImage}
        alt={original_title || original_name}
        width="185"
        height="278"
      />

      <div className="play-details__info">
        <div>
          <h6 className="play-details__info-title">{name || original_title || original_name}</h6>
          <p className="play-details__info-tagline">
            <i>{tagline}</i>
          </p>
          <div className="play-details__info-row">
            <p className="play-details__info-release">
              {extractYearFromDate(release_date) || extractYearFromDate(first_air_date)}
            </p>
            <p className="play-details__info-average">
              <span>{Math.ceil(vote_average.toFixed(2))}</span> / 10
            </p>
            {(media_type || type) && (
              <p className="play-details__info-type">
                {media_type === 'tv' ? 'show' : type || media_type}
              </p>
            )}
          </div>
          <div className="play-details__info-genres">
            {genres?.map((item) => (
              <p key={item.name} className="play-details__info-genres-genre">
                {item.name}
              </p>
            ))}
          </div>
          <p className="play-details__info-overview">{overview}</p>
          <CreditBox credits={credits} />
        </div>

        <div className="play-details__info-btns">
          <button type="button" className="play-details__info-btn" onClick={playTrailer}>
            <BsPlayFill /> Play Trailer
          </button>

          {userMovies && movie && userMovies.map((item) => item.id).includes(id) ? (
            <button
              type="button"
              className="play-details__info-btn"
              onClick={() => removeFromMovieList(movie)}
            >
              <MdRemoveCircleOutline />
              watch list
            </button>
          ) : (
            <button
              type="button"
              className="play-details__info-btn"
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
