import { Children, cloneElement, useRef } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

import Indicators from './Indicators/Indicators';
import useCarouselFonctions from './useCarouselFonctions';

import styles from './Carousel.module.scss';

const Carousel = ({
  children,
  itemToShow,
  showIndicators,
  padding,
  arrowLeftStyle,
  arrowRightStyle,
}) => {
  const carousel = useRef();

  const { handleTouchEnd, handleTouchMove, handleTouchStart, page, updateActive, childrensCount } =
    useCarouselFonctions(carousel, children, itemToShow);

  return (
    <>
      <div
        ref={carousel}
        className={styles.carousel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <button
          type="button"
          aria-label="arrow left"
          style={arrowLeftStyle}
          className={`${styles.arrow} ${styles['arrow-left']}`}
          onClick={() => updateActive(page - 1)}
        >
          <SlArrowLeft />
        </button>
        <div className={styles.inner} style={{ transform: `translateX(-${page * 100}%)` }}>
          {Children.map(children || undefined, (child, index) => (
            <div
              style={{
                paddingRight: `${padding}px`,
                width: `${100 / itemToShow}%`,
              }}
              className={`${styles.item} ${
                index + 1 <= itemToShow * (page + 1) &&
                index >= (page + 1) * itemToShow - itemToShow
                  ? ''
                  : styles.inactive
              }`}
            >
              {cloneElement(child)}
            </div>
          ))}
        </div>
        <button
          type="button"
          style={arrowRightStyle}
          aria-label="arrow right"
          className={`${styles.arrow} ${styles['arrow-right']}`}
          onClick={() => updateActive(page + 1)}
        >
          <SlArrowRight />
        </button>
      </div>
      {showIndicators && (
        <Indicators
          page={page}
          updateActive={updateActive}
          itemsShow={itemToShow}
          childrensCount={childrensCount}
        />
      )}
    </>
  );
};

export default Carousel;
