import styles from './Container.module.scss';

const Container = ({ children, ...rest }) => (
  <div className={styles.container} {...rest}>
    {children}
  </div>
);

export default Container;
