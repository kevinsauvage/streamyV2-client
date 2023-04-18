import { Children } from 'react';

import styles from './CarouselSkeleton.module.scss';

const CarouselSkeleton = ({ itemToShow, padding }) => {
  const skeletonItems = new Array(itemToShow).fill('');

  return (
    <div className={styles.carousel}>
      <ul className={styles.inner} style={{ transform: `translateX(-${0 * 100}%)` }}>
        {Children.toArray(
          skeletonItems?.map(() => (
            <li
              style={{
                marginRight: `${padding}px`,
                width: `${100 / itemToShow}%`,
              }}
              className={`${styles.item}`}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default CarouselSkeleton;
