import { useEffect, useState } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

import apiHelper from '../../helpers/apiHelper';
import BigMovieCard from '../BigMovieCard/BigMovieCard';

import styles from './Slide.module.scss';

const Slide = ({ url }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState();
  const [touchEnd, setTouchEnd] = useState();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!url || trendingMovies?.length || error) return;
    apiHelper(url, undefined, 'get')
      .then((data) => {
        setLoading(false);
        setTrendingMovies(data.results);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [error, trendingMovies?.length, url]);

  const animateCard = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1000);
  };

  const updateIndex = (newIndex) => {
    setTouchStart();
    setTouchEnd();
    if (newIndex <= 0) return setIndex(0);
    if (newIndex >= trendingMovies?.length) return setIndex((trendingMovies?.length || 1) - 1);
    animateCard();
    return setIndex(newIndex);
  };

  // SLIDER
  const handleTouchStart = (event) => setTouchStart(event.targetTouches[0].clientX);

  const handleTouchMove = (event) => setTouchEnd(event.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) updateIndex(index + 1);
    if (touchStart - touchEnd < -100) updateIndex(index - 1);
  };

  return (
    <div
      className={styles.slide}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      {loading ? (
        <div className={styles.loader}>
          <div />
        </div>
      ) : (
        <>
          <button
            type="button"
            className={`${styles.arrow} ${styles.left}`}
            onClick={() => updateIndex(index - 1)}
          >
            <SlArrowLeft />
          </button>

          <BigMovieCard movie={trendingMovies?.[index]} title="TRENDING" animate={animate} />
          <button
            type="button"
            className={`${styles.arrow} ${styles.right}`}
            onClick={() => updateIndex(index + 1)}
          >
            <SlArrowRight />
          </button>
        </>
      )}
    </div>
  );
};

export default Slide;
