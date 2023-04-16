import { Link } from 'react-router-dom';

import './FormBottom.scss';

const FormBottom = ({ firstText, href, linkText, onClick }) => (
  <div className="form-bottom">
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
