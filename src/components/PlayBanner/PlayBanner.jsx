import { image } from '../../helpers/requests';
import Container from '../Container/Container';

import './PlayBanner.scss';

const PlayBanner = ({ movie, playTrailer }) => (
  <div className="play-banner">
    <img
      className="play-banner__image"
      src={`${image.url.w1280}${movie?.backdrop_path}`}
      alt={movie?.original_title || movie?.original_name}
    />
    <Container>
      <div className="play-banner__button">
        <button type="button" className="play-banner__button-icon" onClick={playTrailer}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <polygon points="40,30 65,50 40,70" />
          </svg>
        </button>
        <p>Play Trailer</p>
      </div>
    </Container>
  </div>
);

export default PlayBanner;
