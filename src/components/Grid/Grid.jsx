import styles from './Grid.module.scss';

const Grid = ({ children, ...rest }) => (
  <div className={styles.grid} {...rest}>
    {children}
  </div>
);

export default Grid;
