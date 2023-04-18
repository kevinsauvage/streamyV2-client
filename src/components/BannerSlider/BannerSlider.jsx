import { useEffect, useState } from 'react';

import apiHelper from '../../helpers/apiHelper';
import BigMovieCard from '../BigMovieCard/BigMovieCard';
import Carousel from '../Carousel/Carousel';

import styles from './BannerSlider.module.scss';

const BannerSlider = ({ url }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) return;
    apiHelper(url, undefined, 'get')
      .then((data) => data?.results && setTrendingMovies(data.results))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [url]);

  if (error) return <p>Something went wrong</p>;

  return (
    <div className={styles.slide}>
      {loading && (
        <div className="loader" style={{ minHeight: '400px' }}>
          <div />
        </div>
      )}
      <Carousel itemToShow={1} padding={0}>
        {trendingMovies?.map((movie) => (
          <BigMovieCard key={movie.id} movie={movie} title="TRENDING" />
        ))}
      </Carousel>
    </div>
  );
};

export default BannerSlider;
