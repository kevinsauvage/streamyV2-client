import { Children, cloneElement, useRef } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

import Indicators from './Indicators/Indicators';
import useCarouselFonctions from './useCarouselFonctions';

import styles from './Carousel.module.scss';

const Carousel = ({ children, width, padding }) => {
  const carousel = useRef();

  const {
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
    page,
    itemsShow,
    updateActive,
    childrensCount,
  } = useCarouselFonctions(carousel, children, width);

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
                width: `${100 / itemsShow}%`,
              }}
              className={`${styles.item} ${
                index + 1 <= itemsShow * (page + 1) && index >= (page + 1) * itemsShow - itemsShow
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
          aria-label="arrow right"
          className={`${styles.arrow} ${styles['arrow-right']}`}
          onClick={() => updateActive(page + 1)}
        >
          <SlArrowRight />
        </button>
      </div>
      {itemsShow && (
        <Indicators
          page={page}
          updateActive={updateActive}
          itemsShow={itemsShow}
          childrensCount={childrensCount}
        />
      )}
    </>
  );
};

export default Carousel;
