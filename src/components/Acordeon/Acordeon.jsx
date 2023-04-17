import { useCallback, useEffect, useState } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

import apiHelper from '../../helpers/apiHelper';
import Container from '../Container/Container';
import Title from '../Title/Title';

import AcordeonCard from './AcordeonCard/AcordeonCard';

import styles from './Acordeon.module.scss';

const Acordeon = ({ url, title, type }) => {
  const [index, setIndex] = useState(0);
  const [movies, setMovies] = useState([]);
  const [touchStart, setTouchStart] = useState();
  const [touchEnd, setTouchEnd] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiHelper(url, undefined, 'get')
      .then((data) => data?.results && setMovies(data.results))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [url]);

  const handleNext = useCallback(() => {
    setTouchStart();
    setTouchEnd();

    return setIndex((previous) => {
      if (previous >= movies.length - 2) return previous;
      return previous + 1;
    });
  }, [movies.length]);

  const handlePrevious = useCallback(() => {
    setTouchStart();
    setTouchEnd();

    return setIndex((previous) => {
      if (previous <= -1) return previous;
      return previous - 1;
    });
  }, []);

  // SLIDER
  const handleTouchStart = useCallback(
    (event) => setTouchStart(event.targetTouches[0].clientX),
    []
  );

  const handleTouchMove = useCallback((event) => setTouchEnd(event.targetTouches[0].clientX), []);

  const handleTouchEnd = useCallback(() => {
    if (touchStart - touchEnd > 100) handleNext();
    if (touchStart - touchEnd < -100) handlePrevious();
  }, [handleNext, handlePrevious, touchEnd, touchStart]);

  const activeLeft = useCallback((index_) => (index === -1 ? false : index_ === index), [index]);

  const activeRight = useCallback(
    (index_) => (index === -1 ? index_ === 1 : index_ === index + 2),
    [index]
  );

  if (!movies?.length) return;

  if (error) return <p>Something went wrong...</p>;

  return (
    <Container>
      <div
        className={styles.acordeon}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        {loading ? (
          <div className="loader">
            <div />
          </div>
        ) : (
          <>
            <Title title={title} />
            <div className={styles.container}>
              <button
                type="button"
                onClick={handlePrevious}
                className={`${styles.arrow} ${styles.previous}`}
              >
                <SlArrowLeft />
              </button>

              <div
                className={styles.inner}
                style={{
                  transform:
                    index === -1 ? `translateX(${100 / 3}%)` : `translateX(-${index * 33.333_33}%)`,
                }}
              >
                {movies.map((movie, index_) => (
                  <AcordeonCard
                    movie={movie}
                    key={movie.id}
                    type={type}
                    active={index_ === index + 1}
                    activeLeft={activeLeft(index_)}
                    activeRight={activeRight(index_)}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={handleNext}
                className={`${styles.arrow} ${styles.next}`}
              >
                <SlArrowRight />
              </button>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default Acordeon;
