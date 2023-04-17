import { Link } from 'react-router-dom';

import styles from './FormBottom.module.scss';

const FormBottom = ({ firstText, href, linkText, onClick }) => (
  <div className={styles.container}>
    <p>{firstText}</p>{' '}
    {href ? (
      <Link to={href}>{linkText}</Link>
    ) : (
      <button type="button" onClick={() => onClick()}>
        {linkText}
      </button>
    )}
  </div>
);

export default FormBottom;
