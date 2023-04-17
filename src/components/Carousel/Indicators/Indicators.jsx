/* eslint-disable react/no-array-index-key */
import { Children } from 'react';

import styles from './Indicators.module.scss';

const Indicators = ({ childrensCount, itemsShow, page, updateActive }) => {
  const items = new Array(Math.ceil(childrensCount / itemsShow)).fill('');

  return (
    <div className={styles.indicators}>
      {Children.toArray(
        items?.map((_, index) => (
          <button
            type="button"
            onClick={() => updateActive(index)}
            className={`${styles.indicator} ${index === page ? styles.active : ''}`}
          />
        ))
      )}
    </div>
  );
};

export default Indicators;
