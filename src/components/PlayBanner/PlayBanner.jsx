import { image } from '../../helpers/requests';
import Container from '../Container/Container';

import styles from './PlayBanner.module.scss';

const PlayBanner = ({ movie, playTrailer }) => (
  <div className={styles.banner}>
    <img
      className={styles.image}
      src={`${image.url.w1280}${movie?.backdrop_path}`}
      alt={movie?.original_title || movie?.original_name}
    />
    <Container>
      <div className={styles.button}>
        <button type="button" onClick={playTrailer}>
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
