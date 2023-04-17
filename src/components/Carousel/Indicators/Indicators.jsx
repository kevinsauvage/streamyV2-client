/* eslint-disable react/no-array-index-key */
import styles from './Indicators.module.scss';

const Indicators = ({ childrensCount, itemsShow, page, updateActive }) => (
  <div className={styles.indicators}>
    {new Array(Math.ceil(childrensCount / itemsShow)).fill('').map((_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => updateActive(index)}
        className={`${styles.indicator} ${index === page ? styles.active : ''}`}
      />
    ))}
  </div>
);

export default Indicators;
