import { useEffect, useState } from 'react';

import apiHelper from '../../helpers/apiHelper';
import Carousel from '../Carousel/Carousel';
import CarouselSkeleton from '../CarouselSkeleton/CarouselSkeleton';
import MovieCard from '../MovieCard/MovieCard';
import Title from '../Title/Title';

import styles from './CarouselWrapper.module.scss';

const getItemsToShow = () => {
  const { innerWidth } = window || {};
  if (innerWidth < 500) return 2;
  if (innerWidth < 800) return 3;
  if (innerWidth < 1100) return 4;
  return 5;
};

const CarouselWrapper = ({ url, title, type }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (!url) return;
      try {
        const response = await apiHelper(url, undefined, 'get');
        setLoading(false);
        if (response?.results) setMovies(response.results);
      } catch {
        setError(true);
        setLoading(false);
      }
    };
    getData();
  }, [url]);

  // TODO: Improve error handling
  if (error) return <p>Something went wrong</p>;

  return (
    <div className={styles.container}>
      <Title title={title} />
      {loading ? (
        <CarouselSkeleton itemToShow={getItemsToShow()} padding={10} />
      ) : (
        <Carousel
          arrowLeftStyle={{ left: '-3rem' }}
          arrowRightStyle={{ right: '-3rem' }}
          itemToShow={getItemsToShow()}
          showIndicators
          padding={10}
          loading={loading}
        >
          {movies.map((item) => (
            <MovieCard movie={item} key={item.id} type={type} />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default CarouselWrapper;
