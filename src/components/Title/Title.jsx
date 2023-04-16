import styles from './Title.module.scss';

const Title = ({ title, ...rest }) => (
  <h3 className={styles.title} {...rest}>
    {title}
  </h3>
);

export default Title;
