import Navigation from '../../components/Navigation/Navigation';
import PageLoader from '../../components/PageLoader/PageLoader';

import './Page.scss';

const Page = ({ children, className, loading, ...rest }) => {
  if (loading) return <PageLoader />;

  return (
    <div className={`Page ${className || ''}`} {...rest}>
      <Navigation classNames="hide-desktop" />
      {children}
    </div>
  );
};

export default Page;
