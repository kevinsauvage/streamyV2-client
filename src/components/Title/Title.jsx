import './Title.scss';

const Title = ({ title, ...rest }) => (
  <h3 className="Title" {...rest}>
    {title}
  </h3>
);

export default Title;
