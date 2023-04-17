import { useEffect, useState } from 'react';
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
  const [isSmaller820] = useState(window.innerWidth < 820);

  useEffect(() => {
    apiHelper(url, undefined, 'get').then((data) => setMovies(data.results));
  }, [url]);

  const handleNext = () => {
    setTouchStart();
    setTouchEnd();
    if (index >= movies.length - 2) return;
    return setIndex(index + 1);
  };

  const handlePrevious = () => {
    setTouchStart();
    setTouchEnd();
    if (isSmaller820 && index <= 0) return;
    if (index <= -1) return;
    return setIndex(index - 1);
  };

  // SLIDER
  const handleTouchStart = (event) => setTouchStart(event.targetTouches[0].clientX);

  const handleTouchMove = (event) => setTouchEnd(event.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) handleNext();
    if (touchStart - touchEnd < -100) handlePrevious();
  };

  const activeLeft = (index_) => {
    if (isSmaller820) return index - 1 === index_;
    return index === -1 ? false : index_ === index;
  };

  const activeRight = (index_) => {
    if (isSmaller820) return index + 1 === index_;
    return index === -1 ? index_ === 1 : index_ === index + 2;
  };

  if (!movies?.length) return;

  return (
    <Container>
      <div
        className={styles.acordeon}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        {movies.length === 0 ? (
          <div className={styles.loader}>
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
                    index === -1
                      ? `translateX(${isSmaller820 ? 0 : 33.333_33}%)`
                      : `translateX(-${
                          isSmaller820 ? (index - 1) * 33.333_33 : index * 33.333_33
                        }%)`,
                }}
              >
                {movies.map((movie, index_) => (
                  <AcordeonCard
                    movie={movie}
                    key={movie.id}
                    type={type}
                    active={isSmaller820 ? index === index_ : index_ === index + 1}
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
